declare @modalawal money = 10000000;
declare @periodeTahun int = 3;
declare @tglTransaksi date = '2025-10-31';
declare @persenTahunan decimal(10,2) = 6;

declare @rinciandata table (
	id int identity(1,1),
	periode varchar(30),
	tanggal date,
	modalBerkembang money,
	persenBulanan decimal(10,8),
	bungaBerjalan money
);

declare @persenBulanan decimal(18,8) = power(1+(@persenTahunan/100), 1.0/12) -1;
declare @total money = @modalawal;

declare @i int = 1;
while @i <= (@periodeTahun * 12)
begin
	set @total = @total * (1 + @persenBulanan);
	insert into @rinciandata
	select
		format(dateadd(month, @i, @tglTransaksi), 'yyyy - MMM'),
		dateadd(month, @i, @tglTransaksi),
		@total,
		@persenBulanan,
		@total - @modalawal;
	set @i += 1;
end

select 
	format(@persenBulanan * 100, 'N4') + '%' as Persen_Bulanan,
	format(@total, 'C', 'id-ID') as Total_Akhir,
	format(@total - @modalawal, 'C', 'id-ID') as Keuntungan;

select 
	id,
	periode,
	tanggal,
	replace(format(modalBerkembang, 'C', 'id-ID'),',00','') as Modal_Berkembang,
	format(persenBulanan * 100, 'N4') + '%' as Persen_Bulanan,
	replace(format(bungaBerjalan, 'C', 'id-ID'),',00','') as Bunga_Berjalan
from @rinciandata;
