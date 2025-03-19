ติดตั้ง dependencies:

npm install

รัน Docker สำหรับ database:
docker-compose up -d

สร้างฐานข้อมูลและ seed ข้อมูลเริ่มต้น:
npx prisma migrate reset

รันโปรเจค:
npm run dev
