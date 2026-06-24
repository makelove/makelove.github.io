- DATE:2026-06-24 21:22:11

## index.html
请求 https://play4fun.pythonanywhere.com/ytbl 接口
GET /quere_list
返回
```json
{
    "data": [
        {
            "title": "Unitree R1 | Price from $4,900, Ready Stock",
            "url": "https://www.youtube.com/watch?v=mTMYfVD4zCw"
        },
        {
            "title": "Albanians tear down construction site in on-going protests over Kushner-backed private island",
            "url": "https://www.youtube.com/watch?v=8Ip2MK07Hmo"
        }
    ],
    "message": "视频记录列表",
    "status": 200
}
```

POST /quere_add
data:{
            "title": "Unitree R1 | Price from $4,900, Ready Stock",
            "url": "https://www.youtube.com/watch?v=mTMYfVD4zCw"
        }
返回 json

GET /quere_pop
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
