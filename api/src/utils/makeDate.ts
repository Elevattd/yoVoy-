export default function makeDate(date:any){
  const dateParse = new Date(date)
  return dateParse.getDate() + "-" + (dateParse.getMonth()+1) + "-" + dateParse.getFullYear()
}

export function dateParse(date:string){
  
  const minDate = new Date(date)
  const minDateOnMillisecons = Date.parse(minDate.toJSON())
  
  return minDateOnMillisecons

}

export function getNextDaysByMount(nextDays:number){
  
  const aDayinMillisecons = 86400000
  const currentDate = new Date()
  const currentDateOnMillisecons = Date.parse(currentDate.toJSON())
  
  const nextDateOnMillisecons = currentDateOnMillisecons + (aDayinMillisecons*nextDays)
  const nextDate = new Date(nextDateOnMillisecons)
  
  console.log(currentDate, currentDateOnMillisecons)
  console.log(nextDate, nextDateOnMillisecons)

}

export function isTheNextDaysChecker(nextDays:number, dateEvent: string){
  
  const aDayinMillisecons = 86400000
  const currentDate = new Date()
  const currentDateOnMillisecons = Date.parse(currentDate.toJSON())
  const eventDate = new Date(dateEvent)
  const eventDateOnMillisecons = Date.parse(eventDate.toJSON())
  const nextDateOnMillisecons = currentDateOnMillisecons + (aDayinMillisecons*nextDays)
  const nextDate = new Date(nextDateOnMillisecons)
  
  return  eventDateOnMillisecons <= nextDateOnMillisecons && eventDateOnMillisecons >= currentDateOnMillisecons
  

}