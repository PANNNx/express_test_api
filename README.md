Run with NodeJS

npm install

แก้ไข DB  ที่ไฟล์ model/dbConnection ที่ตัวแปร database_uri
( MongoDB )

Run ด้วยคำสั่ง 
npm start

Route ที่ใช้ได้
1.[GET] Get all items (Filterd)  โดย Filter ด้วย params
letter (หมวดอักษร)
digit (เลขทะเบียน)
province (จังหวัด)
type (ประเภททะเบียน)
department (หน่วยงานเจ้าของข้อมูล)
active(สถานะข้อมูล) (boolean)
limit (จำนวนข้อมูลต่อหน้า)
page (หน้า) 
ex
127.0.0.1:3000/items/?digit=00&limit=15&page=1

2. [GET]Get item detail by id จะแสดงทั้งหมดของ Data ที่ไม่ได้แสดงในหน้าแรก
ex
127.0.0.1:3000/items/:id
   
4. [POST] Create new item เป็น api ที่ใช้เพื่อเพิ่มข้อมูลใหม่ โดยรับ Data ผ่าน Body และ อัพโหลดรูป images และ ไฟล์แนบ attachments ได้
ex
127.0.0.1:3000/items
   
6. [PUT] Edit item ใช้เพื่อแก้ไขข้อมูลด้วย id
ex
127.0.0.1:3000/items/:id
   
8. [DELETE] Delete item ใช้ลบข้อมูล ด้วย id
ex
127.0.0.1:3000/items/:id
