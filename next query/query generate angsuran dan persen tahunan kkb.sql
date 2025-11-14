declare @hargaasli money=null, @dp money=null, @cicilanperbulan money=null, @tahun decimal=null, @trndate smalldatetime=null
set @hargaasli = 100000000 
set @dp = 1000000
set @tahun = 2
set @cicilanperbulan = 8606000
set @trndate = '2025-10-1 00:00:00'

declare @danapinjaman money, @totalbayar money, @totalbunga decimal, @persen decimal(18,6)
declare @rinciantabel table(
	id int,
	angsuran varchar(50),
	cicilanperbulan money,
	duedate smalldatetime,
	bulan decimal(2,0),
	tahun decimal(4,0),
	currentcicilan money
)

set @danapinjaman = @hargaasli - @dp
set @totalbayar = @cicilanperbulan * (@tahun * 12)
set @totalbunga = @totalbayar - @danapinjaman
set @persen = @totalbunga/(@danapinjaman * @tahun)

declare @baris int=1 declare @currentcicil decimal=0, @duedate smalldatetime 

while @baris <= (@tahun * 12)
begin
	set @duedate = dateadd(month, @baris, @trndate)
	set @currentcicil = @cicilanperbulan + @currentcicil
	insert into @rinciantabel
	values(
		@baris, 
		concat('Angsuran ke - ', @baris), 
		@cicilanperbulan, 
		@duedate, 
		CAST(MONTH(@duedate) as decimal), 
		CAST(YEAR(@duedate) as decimal),
		case when @currentcicil < 0 then 0 else @currentcicil end)
	set @baris += 1
end

select 
	replace(format(@danapinjaman, 'c','id-ID'), ',00','') as 'Dana Pinjaman',
	replace(format(@totalbayar,'c','id-ID'),',00','') as 'Total Bayar Di Bank',
	replace(format(@totalbunga,'c','id-ID'),',00','') as 'Total Bunga', 
	@duedate as 'jatuh tempo Terakhir',
	concat(format(@persen*100,'n2'),'%') as Persentase
select 
	id as no, 
	angsuran, 
	replace(format(cicilanperbulan,'c','id-ID'),',00','') as 'Cicilan Perbulan', 
	cast (duedate as varchar) as 'Jatuh Tempo',
	duedate,
	bulan,
	tahun,
	replace(format(currentcicilan,'c','id-ID'),',00','') as 'rincian Cicilan' from @rinciantabel