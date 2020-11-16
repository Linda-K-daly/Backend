async function morning() {

    const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/mongoose_populate',
        { useNewUrlParser: true, useUnifiedTopology: true });
    // err => console.error(err))

    const AdressModel = require('./models/Adress');
    const StudentModel = require('./models/Student');




    const adress1 = new AdressModel({
        // ID: ObjectId,
        streetName: 'rue de la Paix',
        streetNumber: '45',
        postCode: '75002',
        city: 'Paris',
    });

    const resultadress1 = await adress1.save()

    let adressId = AdressModel.findOne(adress1, function (err, result) {
        console.log('Coucou l\'adresse', result._id)
    })

    const student1 = new StudentModel({
        // ID: ObjectId,
        firstName: 'Raky',
        surname: 'Beyong',
        adress: adress1,
    });

    const student2 = new StudentModel({
        // ID: ObjectId,
        firstName: 'Lilia',
        surname: 'Nebuleuse',
        adress: adress1,
    });

    const resultstudent1 = await student1.save()

    const resultstudent2 = await student2.save()

    // async function student() {

    // const student1 = await StudentModel.findOne({_id}).lean()

    // }


    StudentModel
        .findOne({adressId})
        .populate('Adress')
        .exec((err,student1) => {
            console.log ('the id is', adress1._id )
        });


}

morning()