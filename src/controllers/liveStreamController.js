const { v4: uuidv4 } = require('uuid');
const { streamclient } = require('../config/streamio.config');


exports.createChannel =async (req, res)=>{

  const {title} = req.body
  const callType = 'livestream';
  const callId = uuidv4();

  const call = streamclient.
}

exports.getChannels = async(req,res)=>{

}

exports.startLiveStreaming = async(req, res)=>{

}

exports.endLiveStreaming = async(req, res)=>{

}