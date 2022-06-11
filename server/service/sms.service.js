const { Event, User } = require('./db/models')
const axios = require('axios');
const CronJob = require('cron').CronJob
const { job } = require('cron');

//* Функция для 
// let bob = new CronJob('* * * * * *', () => console.log(123123123), null, true, 'America/Los_Angeles')
// bob.start()

// //* Функция для проверки событий и отправки смс
// setInterval(SMS, 20000)

async function SMS() {
  const dateEvent = await Event.findAll()
  const day = new Date()
  for (let i = 0; i < dateEvent.length; i++) {
    const day = new Date();
    const tomorrow = new Date(day.setDate(day.getDate()));
    // if(new Date() < new Date(dateEvent[i].date) && new Date(day.setDate(day.getDate() + 1)) >= new Date(dateEvent[i].date)){
      if(new Date(tomorrow.setHours(0,0,0,0)) < new Date(dateEvent[i].date) && new Date(day.setDate(day.getDate() + 1)) >= new Date(dateEvent[i].date)){

      const user = await User.findOne({ where: { id: dateEvent[i].user_id }})
      console.log(Number(user.phone));
      const url = 'https://jiva108jiva@gmail.com:muCc3bNoPXqnFd1fGAUYtyiYzCB@gate.smsaero.ru/v2/sms/send'
      user.isActiveDelivery = true
      axios({
        method: 'POST',
        url: 'https://jiva108jiva@gmail.com:muCc3bNoPXqnFd1fGAUYtyiYzCB@gate.smsaero.ru/v2/sms/send/',
        data: {
          number: Number(user.phone),
          text: `Привет, ты не забыл про ${dateEvent[i].title}? Можешь выбрать подходящий букет на нашем сайте.`,
          sign: 'SMS Aero'
        }
      })
      
      .then(res => console.log(res))
      .then(res => res.json())
    }
  }
}
