import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';// 解决跨域问题


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // 修改为你的前端地址
  methods: ['GET', 'POST'],
}));

// 数据库连接
const db = mysql.createConnection({
  host: 'localhost',      // 数据库地址
  port: 3306,             // MySQL 端口号
  user: 'root',           // 数据库用户名
  password: '',           // 数据库密码
  database: 'rabbitshop'  // 数据库名
});

// 测试数据库连接
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Database connected!');
});

// 创建 API 路由
/*格式化前
app.get('/api/goods', (req, res) => {
  db.query('SELECT * FROM goods', (err, results) => {
    if (err) {
      return res.status(500).send('Error fetching goods: ' + err.message);
    }
    res.json(results); // 返回商品数据
  });
})
*/
/* 格式化后
app.get('/api/goods', (req, res) => {
  db.query('SELECT * FROM goods', (err, results) => {
    if (err) {
      return res.status(500).json({
        code: "0", // 错误状态
        msg: "Error fetching goods: " + err.message,
        result: null
      });
    }
    res.json({
      code: "1", // 成功状态
      msg: "success",
      result: results // 返回商品数据
    });
  });
});
*/

// 获取分类及商品的路由
app.get('/api/categories-products', (req, res) => {
  // SQL 查询：获取所有分类和每个分类下的商品信息
  const sql = `
    SELECT c.id AS category_id, c.name AS category_name, c.picture AS category_picture,
           g.id AS product_id, g.name AS product_name, g.picture, g.price
    FROM categories c
    LEFT JOIN goods g ON c.id = g.category_id
    ORDER BY c.id, g.id;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database Error:", err.message);
      return res.status(500).json({
        code: "0",
        msg: "Error fetching data: " + err.message,
        result: null
      });
    }

    // 格式化数据：将商品按分类分组
    const formattedData = results.reduce((acc, item) => {
      // 查找当前分类是否已经存在
      const category = acc.find(cat => cat.id === item.category_id);

      if (category) {
        // 如果当前分类已存在，则添加商品
        if (item.product_id) {
          category.products.push({
            id: item.product_id,
            name: item.product_name,
            picture: item.picture,
            price: item.price
          });
        }
      } else {
        // 如果当前分类不存在，则创建新的分类，并添加商品
        acc.push({
          id: item.category_id,
          name: item.category_name,
          picture: item.category_picture,
          products: item.product_id
            ? [{
                id: item.product_id,
                name: item.product_name,
                picture: item.picture,
                price: item.price
              }]
            : []
        });
      }
      return acc;
    }, []);

    // 返回格式化后的数据
    res.json({
      code: "1",
      msg: "success",
      result: formattedData
    });
  });
});

// 启动后端服务
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
