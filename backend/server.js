// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser")

// const users = [
// 	{
// 		id:"123",
// 		name: "himansu",
// 		skills: ["orange", "lemon", "lichi"]
// 	}
// ]

// // app.use(bodyParser.urlencoded({extended: false});
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// app.post("/", (req, res) => {
// 	res.json({name: "himansu"});
// })

// app.get("/profile", (req, res) => {
// 	res.send(users);
// })

// // app.get("/:id", (req, res) => {
// // 	res.send(users);
// // })

// app.put("/profile/", (req, res) => {
// 	// const { id, name } = req.body;
// 	// users[0].name = "Rinky"
// 	// if (users[0].id === id) {
// 	// res.send(users);
// 	// }

// 	const {skill} = req.body;
// 	let isDone = false;
// 	users.forEach(user => {
// 		user.skills.forEach((skill, i) => {
// 			if (skill.includes("lemon")) {
//                  user.skills[i] = "jackfruits";
//                  res.json(users);
//                  isDone = true;
// 			}
// 		})
// 		if (isDone) {
// 		res.json(users);
// 	   } else {
// 		res.status(404).json({ message: "Skill not found" });
// 	   }
// 	})
	// res.json(users);

// this send a long pending request that got a headache
	// const {id, name} = req.body;
	// if (users[0].id === id) {
	//     users[0].name = "Rohit"
	//     res.json(users)
	// }
// })

// const search = "lemon"
// const replace = "jackfruits"
// app.put("/update", (req, res) => {
// 	const { id } = req.params;
// 	if (users[0].id === id) {
// 		users[0].skills.forEach((skill, i) => {
//             if (skill.includes(search)) {
//             	users[0].skills[i] = replace;
//             	res.send(users);
//             }
// 		})
// 	}
// })

// app.get("/update", (req, res) => {
// 	res.json(users);
// })

// app.delete("/:id", (req, res) => {
// 	res.send(users);
// })
// app.listen(3000);

// const users = [
//   {
//     id: "123",
//     name: "Prashant",
//     passion: "Coding",
//     image: "",
//     skills: [
//       { id: "1", name: "html" },
//       { id: "2", name: "css" },
//       { id: "3", name: "react.js" },
//       { id: "4", name: "next.js" },
//       { id: "5", name: "node.js" }
//     ]
//   }
// ];

// function deleteSkill(userId, skillId) {
//   const user = users.find(user => user.id === userId);
//   if (user) {
//     user.skills = user.skills.filter(skill => skill.id !== skillId);
//   }
// }

// // Delete the skill with id "3" for the user with id "123"
// deleteSkill("123", "3");
// console.log(users);

// function updateSkill(userId, skillId, newSkillName) {
//   const user = users.find(user => user.id === userId);
//   if (user) {
//     const skill = user.skills.find(skill => skill.id === skillId);
//     if (skill) {
//       skill.name = newSkillName;
//     }
//   }
// }

// // Update the skill with id "2" for the user with id "123"
// updateSkill("123", "2", "advanced css");
// console.log(users);



const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// const users = [
//   {
//     id: "123",
//     name: "Prashant",
//     passion: "Coding",
//     image: "",
//     skills: [
//       { id: "1", name: "html" },
//       { id: "2", name: "css" },
//       { id: "3", name: "react.js" },
//       { id: "4", name: "next.js" },
//       { id: "5", name: "node.js" }
//     ]
//   }
// ];

const users = [
   {
    id: 123,
    name: "himansu"
   },
   {
    id: 124,
    name: "rinky"
   },
   {
    id: 125,
    name: "sipu"
   },
   {
    id: 126,
    name: "subrat"
   }
]

app.get("/user", (req, res) => {
  res.json(users);
})

// app.put("/:id", (req, res) => {
//      const { id, skill } = req.body;
//      if (users[0].skills[1].id === "2") {
//       users[0].skills[1].name = "I did it ";
//       res.json(users)
//      }
// })

app.post("/user", (req, res) => {
  const { id, name} = req.body;
  users.push({id: 126, name: "Chintu"});
  // res.json(user);
  res.json(users);
})

app.put("/user/:id", (req,res) => {
  const { id, name } = req.body;
  let found = false;
  users.forEach((user, i) => {
    if (user.id === 126) {
      users[i].name = "paresh";
      found = true;
      // res.json(user);
      res.json(users);
    }
  })
})

app.delete("/user", (req, res) => {
  const { id, name } = req.body;
  let found = false;
  users.forEach((user, i) => {
    if (user.id === 126) {
      users[i] = {};
      res.json(user);
      // res.json(users);
    }
  })
})

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  // res.json(users);
  users.forEach(user => {
    if (user.id === 126) {
      // res.json(user);
      res.json(users); // this is already deleted so why call this this show sending request so please don't do that
    }
  })
})

// app.get("/user/:id", (req, res) => {
//   const { id } = req.params;
//   res.json(users);
// })























app.listen(3000);

