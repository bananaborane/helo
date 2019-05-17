-- based on DevMountain's Postgresql Database, NOT Helo Simulation Database 


--  subquery competency
select * from track
where album_id in ( select album_id from album where title = 'Dark Side of the Moon' );

-- fetches us all rows from track from the album title where the album's title equals to the Dark Side of the Moon

-- format: select * from table_name
-- where table_column in ( select * from table2_name where table2_column in ( -- .... ) )
