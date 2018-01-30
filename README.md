## 说明
利用node爬取80s网的电影、电视剧和综艺数据，并封装接口以便前端或客户端使用。

## 技术栈：superagent+cheerio+mysql+sequelize+koa+koa-router+koa-static

## mysql数据库配置说明

* 打开命令行，创建数据库movie_database， CREATE DATABASE movie_database;
* USE movie_database; 进入对应数据库。
* grant all privileges on test.* to 'www'@'%' identified by 'www';  此命令作用是创建MySQL的用户名和口令，均为www，并赋予操作test数据库的所有权限。
* 创建movie表。sql语句如下：

```sql
CREATE TABLE `movie` (
  `id` varchar(50) NOT NULL,
  `name` char(100) NOT NULL,
  `type` char(100) DEFAULT NULL,
  `region` varchar(50) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `release_data` varchar(50) DEFAULT NULL,
  `update_data` varchar(50) DEFAULT NULL,
  `score` char(10) DEFAULT NULL,
  `actor` text,
  `director` text,
  `description` text,
  `thunder` text NOT NULL,
  `createAt` bigint(20) NOT NULL,
  `updateAt` bigint(20) NOT NULL,
  `version` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```



## 接口说明

* 获取电影列表

url: /movie  query: curr 当前页数 limit 每页显示多少 query 影片类型 <json string: type,region,language>  order 排序参数 0更新时间 1评分

示例：http://localhost:8000/movie?curr=1&limit=20&query={%20%22type%22:%20%22%E6%82%AC%E7%96%91%22,%20%22language%22:%20%22%E8%8B%B1%E8%AF%AD%22%20}

```javascript
{
	error_no: 0,
	total: 54,
	currentPage: 1,
	totalPage: 3,
	list: [
		{
		id: "728d9faa-68ed-4cf3-897a-c940b61043e8",
		name: "迷镇凶案",
		createAt: 1516857759282,
		updateAt: 1516857759282,
		version: 0
		},
		{
		id: "fe94ded1-0392-46c4-bc6e-f847ad6730d0",
		name: "东方快车谋杀案",
		createAt: 1516857759282,
		updateAt: 1516857759282,
		version: 0
		},
		{
		id: "4b803ef7-78a4-42ef-a469-7c9503f4494d",
		name: "伊甸园计划",
		createAt: 1516857761403,
		updateAt: 1516857761403,
		version: 0
		},
		{
		id: "2decf9f6-1542-4adf-b375-2834c5137f55",
		name: "电锯惊魂8：竖锯",
		createAt: 1516857764204,
		updateAt: 1516857764204,
		version: 0
		},
		{
		id: "ce6c904b-10c0-409e-8619-1610c6c38235",
		name: "彗星来的那一夜",
		createAt: 1516857766309,
		updateAt: 1516857766309,
		version: 0
		},
		{
		id: "807cf89d-15b2-49a2-8617-226a022a925c",
		name: "猎凶风河谷",
		createAt: 1516857768701,
		updateAt: 1516857768701,
		version: 0
		}
		...
	]
}
```

total 总影片 currentPage 当前页数（用于分页）totalPage 总页数 id 电影对应的唯一id  name 电影名字 后面三个是对应创建于数据库的时间

* 获取电影列表

url: /movieDetail  query: id 影片id

示例：http://localhost:8000/movieDetail?id=fe94ded1-0392-46c4-bc6e-f847ad6730d0

```javascript
[
	{
		id: "fe94ded1-0392-46c4-bc6e-f847ad6730d0",
		name: "东方快车谋杀案",
		type: "悬疑犯罪剧情",
		region: "美国",
		language: "国语英语法语",
		time: "114分钟",
		release_data: "2017-11-03",
		update_data: "2018-01-24",
		score: "7.0",
		actor: "肯尼思·布拉纳KennethBranagh/佩内洛普·克鲁兹PenélopeCruz/威廉·达福WillemDafoe/朱迪·丹奇JudiDench/约翰尼·德普JohnnyDepp/乔什·加德JoshGad/德里克·雅各比DerekJacobi/小莱斯利·奥多姆LeslieOdomJr./米歇尔·菲佛MichellePfeiffer/黛西·雷德利DaisyRidley/露西·宝通LucyBoynton/奥利维娅·科尔曼OliviaColman/亚当·加西亚AdamGarcia/米兰达·莱森MirandaRaison/曼努埃尔·加西亚-鲁尔福ManuelGarcia-Rulfo/汤姆·巴特曼TomBateman/马尔万·肯扎里MarwanKenzari/阿拉·萨菲AlaaSafi/谢尔盖·鲍鲁宁SergeiPolunin",
		director: "肯尼思·布拉纳KennethBranagh",
		description: " 该片改编自小说《东方快车谋杀案》，讲述了在大侦探波洛所坐的“东方快车”上，大富翁雷切特死在自己的包厢里，波洛最后成功地解开了一宗谋杀案谜团的故事。 波洛乘上东方快车，夜间三次被吵醒，第二天清晨便发现同车的美国富商雷切尔被人谋杀，死者被人戳了12刀。波洛根据他所观察到的各种可疑迹象以及同车人士的讯问，并结合美国实行的12人陪审团制度等情况进行逻辑推理，揭开一起“集体复仇”案，在东方快车上巧妙破解一宗谋杀案。 ",
		thunder: "thunder://QUFodHRwOi8vZGw5OC44MHMuY29tLmNvOjk5OS8xODAxL+S4nGblv6tj6LCLc+ahiC/kuJxm5b+rY+iwi3PmoYgubXA0Wlo=&&thunder://QUFodHRwOi8vZGw5OC44MHMuY29tLmNvOjk5OS8xODAxL+S4nGblv6tj6LCLc+ahiC/kuJxm5b+rY+iwi3PmoYhfYmQubXA0Wlo=&&",
		createAt: 1516857759282,
		updateAt: 1516857759282,
		version: 0
	}
]
```

release_data 上映时间 update_data 上传时间 score 豆瓣评分 thunder 对应的下载链接，分别有大屏和高清，使用&&隔开。

* 搜索

url: /search  query: query 搜索关键词（包括影片名称、演员和导演） curr 当前页数 limit 每页显示多少

示例：http://localhost:8000/search?curr=1&limit=20&query=%E5%88%98%E5%BE%B7%E5%8D%8E

```javascript
{
	total: 3,
	list: [
		{
			id: "0e8df922-90ea-4492-8893-298c81c1e483",
			name: "至尊无上",
			description: " 有“亚洲第一快手”之称的陈亚蟹（刘德华 饰）因出老千入狱，刑满出狱后，他的搭档Sam（谭咏麟 饰）第一时间令助手波波（关之琳 饰）迎接。亚蟹刚获得自由，便同Sam合演了一出里应外合扮猪吃老虎的好戏。不久，两人受朋友所托，远赴美国调查日本出千团伙，结果顺利为赌场挽回损失，令日本人颜面扫地，日本方面自此寻机报复。Sam在美国结识了富家大小姐童可人（陈玉莲 饰），Sam使出众多浪漫桥段抱得美人归，也令岳父接纳了自己，但代价却是要疏远亚蟹等不体面的朋友。同时，日本出千集团首脑宫本父子加紧了报仇的步骤，亚蟹为搭救Sam，被对方废了自己引以为傲的快手。面对宫本的咄咄逼人，亚蟹与Sam兄弟俩终于再次联手对敌。 ",
			createAt: 1516857889680,
			updateAt: 1516857889680,
			version: 0
		},
		{
			id: "bb25fb72-9413-4112-9be6-70f6bf4790ad",
			name: "追龙",
			description: " 电影讲述了香港现代史上两大著名狠角色大毒枭跛豪（甄子丹饰）、五亿探长雷洛（刘德华饰）的传奇故事。 该片讲述了能打敢拼的伍世豪偷渡来到香港为了长久生存之道，他与心思缜密的探长雷洛联手制霸香港的故事。 上世纪六七十年代，香港由英国殖民，权势腐败、社会混乱。1963年，穷困潦倒的青年阿豪（甄子丹饰）偷渡至香港，抱着“生死有命、富贵在天”之心决意一搏人生。阿豪带着几个兄弟，从九龙城寨底层开始一路刀刃舔血，爬上香港毒品霸主之位，一手掌控香港十大黑帮，江湖人称“跛豪”。而雷洛（刘德华饰）则从一位普通探长一步步爬上华人总探长高位，统领全香港三万警察，手握香港治安“潜规则”。为垄断香港黄赌毒三大经济产业，跛豪与雷洛结拜为兄弟，两人一黑一白两手遮天，权势滔天，家财亿万，独霸香港岛…… ",
			createAt: 1516857759282,
			updateAt: 1516857759282,
			version: 0
		},
		{
			id: "ee6f575e-4cc4-4b11-96fe-e1dda0768021",
			name: "侠盗联盟",
			description: " 江洋大盗张丹（刘德华 饰）在一次行动中遭遇黑吃黑，失手被擒入狱。三年后，出狱的张丹会合老搭档小宝（杨祐宁 饰），与新入伙的叶红（舒淇 饰）联手，在追捕自己多年的法国警探皮埃尔（让•雷诺 饰）眼皮底下盗窃得手。 小试身手之后，张丹找到宝物的买家——与自己情同父子的犯罪组织头目金刚（曾志伟 饰），二人重逢之后，张丹接到新的任务。与此同时，为将张丹一伙人捉拿归案，皮埃尔说服对张丹因爱生恨的前女友Amber（张静初 饰）加入追捕行动。 从戛纳到布拉格，跨越欧洲大陆的猫鼠游戏正激烈上演。几次短兵相接后，张丹的行踪逐渐被皮埃尔掌握。而随着一行人接近终极目标，张丹的真实计划也逐渐浮出水面…… ",
			createAt: 1516857814786,
			updateAt: 1516857814786,
			version: 0
		}
	]
}
```

total 总数 

## 注意

_数据只是部分展示，总影片数大概是八千多部!!!_
_电视剧和综艺后续再开发。。。_


