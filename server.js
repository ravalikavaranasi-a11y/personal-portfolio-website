const express=require('express'),cors=require('cors'),Database=require('better-sqlite3'),path=require('path');
const app=express(),db=new Database('portfolio.db');
app.use(cors());app.use(express.json());app.use(express.static(path.join(__dirname,'public')));
db.exec(`CREATE TABLE IF NOT EXISTS profile(id INTEGER PRIMARY KEY,name TEXT,title TEXT,bio TEXT,email TEXT,location TEXT);
CREATE TABLE IF NOT EXISTS projects(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT,description TEXT,technologies TEXT,link TEXT);
CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email TEXT,message TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP);`);
if(!db.prepare('SELECT * FROM profile WHERE id=1').get())db.prepare('INSERT INTO profile VALUES(1,?,?,?,?,?)').run('Your Name','Computer Science Student','Full-stack developer building practical and user-friendly web applications.','you@example.com','India');
if(!db.prepare('SELECT COUNT(*) c FROM projects').get().c){let s=db.prepare('INSERT INTO projects(title,description,technologies,link) VALUES(?,?,?,?)');s.run('Blog Platform','Full-stack blog platform with authentication and comments.','HTML, CSS, JavaScript, Node.js, SQLite','#');s.run('Task Manager','Responsive task tracking application with CRUD operations.','HTML, CSS, JavaScript, Express, SQLite','#');s.run('E-Commerce Store','Shopping application with products, cart and orders.','HTML, CSS, JavaScript, Node.js, SQLite','#')}
app.get('/api/profile',(q,r)=>r.json(db.prepare('SELECT * FROM profile WHERE id=1').get()));
app.get('/api/projects',(q,r)=>r.json(db.prepare('SELECT * FROM projects ORDER BY id DESC').all()));
app.post('/api/messages',(q,r)=>{let{x,y,z}=q.body;if(!x||!y||!z)return r.status(400).json({error:'All fields are required'});db.prepare('INSERT INTO messages(name,email,message) VALUES(?,?,?)').run(x,y,z);r.status(201).json({message:'Message sent successfully'})});
app.get('*',(q,r)=>r.sendFile(path.join(__dirname,'public','index.html')));app.listen(process.env.PORT||3000,()=>console.log('Portfolio running on port 3000'));
