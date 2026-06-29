- DATE:2026-06-24 21:22:11

## index.html
请求 https://play4fun.pythonanywhere.com/ytbl 接口
GET /queue_list
返回
```json
{
    "data": [
          "5ex-TziGcfA": {
        "title": "Planet | Sci-Fi Short Film | DUST",
        "url": "https://www.youtube.com/watch?v=5ex-TziGcfA"
    },
    ],
    "message": "视频记录列表",
    "status": 200
}
```

POST /queue_add
data:{
            "title": "Unitree R1 | Price from $4,900, Ready Stock",
            "url": "https://www.youtube.com/watch?v=mTMYfVD4zCw"
        }
返回 json

GET /queue_pop
返回
```json
{
    "count": 1,
    "data": {
        "title": "Unitree R1 | Price from $4,900, Ready Stock",
        "url": "https://www.youtube.com/watch?v=mTMYfVD4zCw"
    },
    "status": 200
}
```

GET /queue_remove
参数ytid
返回
```json
{
    "count": 1,
    "data": {
          "5ex-TziGcfA": {
        "title": "Planet | Sci-Fi Short Film | DUST",
        "url": "https://www.youtube.com/watch?v=5ex-TziGcfA"
    },
    },
    "status": 200
}
```

运行，看效果
python3 -m http.server 8000 & open http://localhost:8000/index.html