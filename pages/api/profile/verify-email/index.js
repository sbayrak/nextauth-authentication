import {connectToDatabase} from '../../../../util/mongodb'
import { v4 as uuidv4 } from 'uuid';
import sgMail from '@sendgrid/mail'

export default async   (req,res) => {

    const { db } = await connectToDatabase();
    sgMail.setApiKey(process.env.SENDGRID_EMAIL_VERIFICATION_KEY)
     

    const { email, password } = req.body;
    const token = uuidv4();
    const date = new Date();
    const callbackUrl = `${process.env.NEXTAUTH_URL}/auth/verifyrequest`;

    const isUserExists = await db.collection('users').findOne({email});
    console.log(req.body);

    if(isUserExists){
        res.status(201).json({success: true})
        console.log('User exists!');
    }
    else if(!isUserExists){
        await db.collection('verificationRequests').insertOne({email: req.body.email, password: password, token, callbackUrl  ,madeAt: date.toString()})
        
        res.status(201).json({success: true})
    }
    



}