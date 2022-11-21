const express = require('express')
const app = express()
const port = 3000
const { User, Epresence } = require('./models');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/login', async (req, res) => {
    try {
        let data = req.body;
        let userFound = await User.findOne({
            where: {email: data.email}
        });
        if(!userFound) {
            throw {name: "Not found"};
        }
        let verifyPassword = bcrypt.compareSync(data.password, userFound.password);
        if(!verifyPassword) {
            throw {name: "Not found"};
        }
        let payload = userFound.id;
        let access_token = jwt.sign(payload, '12345');
        res.status(200).json({access_token});
    } catch(error) {
        if(error.name === "Not found") {
            res.status(404).json({message: "Not Found"});
        } else {
            res.status(500).json({message: "Internal server error"});
        }
    }
});

app.post('/epresence', async (req, res) => {
    try {
        let { access_token } = req.headers;
        let { type, waktu } = req.body;
        if (!access_token) {
            throw {name: 'Unauthorized'};
        }
        let payload = jwt.verify(access_token, '12345');
        let id_users = payload;
        console.log(payload);
        let userCreated = await Epresence.create({id_users, type, waktu});
        res.status(201).json(userCreated);
    } catch (error) {
        console.log(error)
        if(error.name === "Unauthorized") {
            res.status(403).json({message: "Unauthorized"});
        } else {
            res.status(500).json({message: "Internal server error"});
        }
    }
})

app.patch('/epresence/:id', async (req, res) => {
    try {
        let { access_token } = req.headers;
        let { is_approve } = req.body;
        let idEpresence = req.params.id;
        if (!access_token) {
            throw {name: 'Unauthorized'};
        }
        let payload = jwt.verify(access_token, '12345');
        let id = payload;
        let spvFound = await User.findByPk(id);
        let epresenceFound = await Epresence.findByPk(idEpresence);
        let idUser = epresenceFound.id_users
        let userFound = await User.findByPk(idUser);
        if(spvFound.npp !== userFound.npp_supervisor) {
            throw {name: 'Unauthorized'}
        }
        await epresenceFound.update({ is_approve });
        await epresenceFound.save();
        res.status(200).json(epresenceFound);
    } catch(error) {
        console.log(error)
        if(error.name === "Unauthorized") {
            res.status(403).json({message: "Unauthorized"});
        } else {
            res.status(500).json({message: "Internal server error"});
        }
    }
})

app.get('/epresence', async (req, res) => {
    try {
        let { access_token } = req.headers;
        if (!access_token) {
            throw {name: 'Unauthorized'};
        }
        let payload = jwt.verify(access_token, '12345');
        let id = payload;
        let epresence = await User.findByPk(id, { include: Epresence });
        // var mergedList = _.map(a1, function(item){
        //     return _.extend(item, _.findWhere(a2, { id: item.id }));
        // });
        let newEpresence = {
            id_user: epresence.id,
            nama_user: epresence.nama,
            tanggal: epresence.Epresences[0].waktu.toString().slice(4, 15),
            waktu_masuk: new Date(epresence.Epresences[0].waktu).toLocaleTimeString(),
            waktu_pulang: new Date(epresence.Epresences[1].waktu).toLocaleTimeString(),
            status_masuk: (epresence.Epresences[0].is_approve === true) ? 'APPROVE' : 'REJECT',
            status_pulang: (epresence.Epresences[1].is_approve === true) ? 'APPROVE' : 'REJECT',
        }
        res.status(200).json({message: "Success get data", data: newEpresence});
    } catch (error) {
        console.log(error)
        if(error.name === "Unauthorized") {
            res.status(403).json({message: "Unauthorized"});
        } else {
            res.status(500).json({message: "Internal server error"});
        }
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})