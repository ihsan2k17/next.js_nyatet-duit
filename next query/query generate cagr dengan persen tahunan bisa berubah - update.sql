declare 
	@percentaseyyear decimal(18,10)=null, 
	@invenstasi money=null, 
	@rateperbulan decimal(18,10)
set @percentaseyyear = cast(6 as decimal(18,10))/100


declare @tampunganperiods table(id int, dcainvestasi money, months int, cumstart int, cumend int,startdate smalldatetime)
declare @tampunganparam table (id int, periode int, startdate smalldatetime, enddate smalldatetime, dcainvestment money, note varchar(100))
declare @tempeampunganparam table(stardate smalldatetime, enddate smalldatetime, dcainvestment money, note varchar(100))
declare @tabelrincian table (id int, periode varchar(20), currentinvestasi money, percentase decimal(10,4), inves money, rinciandata money, bunga money, totalbunga money)

insert into @tampunganparam values
	(1,1, '2026-07-01', '2026-10-01', 5600000, 'dca pertama'),
	(2,2, '2026-11-01', '2026-11-01', 7000000, 'bonus'),
	(3,3, '2027-02-01', '2027-02-01', 7000000, 'bonus kedua'),
	(4,4, '2026-11-01', '2027-01-01', 5060000, 'dca kedua'),
	(5,5, '2027-02-01', '2028-11-01', 5060000, 'dca ketiga')
insert into @tempeampunganparam 
select startdate, enddate, dcainvestment, note from @tampunganparam order by startdate, enddate
delete @tampunganparam
insert into @tampunganparam
select 
	ROW_NUMBER() over(order by stardate, enddate) as id,
	ROW_NUMBER() over(order by stardate, enddate) as periode,
	stardate, enddate, dcainvestment, note
from @tempeampunganparam order by stardate, enddate

--select * from @tampunganparam --order by startdate

insert into @tampunganperiods 
select 
	t.id, 
	t.dcainvestment,  
	DATEDIFF(MONTH, t.startdate, t.enddate) + 1 as months,
	(SELECT ISNULL(SUM(DATEDIFF(MONTH, t2.startdate, t2.enddate) + 1), 0) FROM @tampunganparam t2 WHERE t2.id < t.id) + 1 AS cumstart,
	(select isnull(sum(DATEDIFF(month, t3.startdate, t3.enddate) + 1), 0) from @tampunganparam t3 where t3.id <= t.id) as cumend,
	t.startdate
from @tampunganparam t where t.id in(select id from @tampunganparam)

declare @baris int=1, @countmonth int=null, @total money = 0, @currentinvest money = 0,
	@bunga money = 0, @totalbunga money = 0, @startdate smalldatetime, @offset int, @datereal smalldatetime

set @rateperbulan = power(1 + @percentaseyyear, 1.0 / 12) - 1
set @countmonth = (select sum(DATEDIFF(month, startdate, enddate)+1) from @tampunganparam where id in (select id from @tampunganparam)) 

while @baris <= @countmonth
begin
	select top 1 @currentinvest = dcainvestasi, @invenstasi=dcainvestasi, @offset = @baris - cumstart, @startdate = startdate 
	from @tampunganperiods t1 where @baris between cumstart and cumend
	
	set @bunga = (@total + @currentinvest ) * @rateperbulan
	set @total = @total + @currentinvest + @bunga
	set @totalbunga = @totalbunga + @bunga
	set @datereal = DATEADD(month,@offset, @startdate)
	--select @datereal as 'tgl real', @offset as 'Off Set', @startdate as 'Tgl Awal'
	insert into @tabelrincian 
	values (
		@baris, 
		concat(month(@datereal),' - ',year(@datereal)), 
		@currentinvest, 
		@rateperbulan, 
		@invenstasi,
		@total, 
		@bunga, 
		@totalbunga)

	set @baris = @baris + 1
end 

select 
	id, 
	periode,
	concat(format(cast(percentase as decimal(10,4))*100,'n2'),'%') as 'Percentase Monthly',  
	replace(format(inves, 'c','id-ID'),',00','')as 'Value',
	replace(format(rinciandata, 'c','id-ID'),',00','')as 'Rincian Data',
	replace(format(bunga,'c','id-ID'),',00','')as 'Bunga Bertumbuh' , 
	replace(format(totalbunga,'c','id-ID'),',00','')as 'NIlai Bunga' from @tabelrincian