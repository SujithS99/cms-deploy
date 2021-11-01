export default function ParseDuration(value) {
  var year, months, days, result;
         
  year = value >= 365 ? Math.floor(value / 365) : 0;
  value = year ? value - (year*365) : value;
      
  months = value >= 30 ? Math.floor((value % 365) / 30) : 0;
  value = months ? value - (months*30) : value;
      
  days = value < 30 ? value : 0;
  
  
  result = (year === 1 ) ? year+' year ': (year > 0 ? year+' years ' : '');
  result += (months === 1 ) ? months + ' month ' : (months > 0 ? months+' months ' : '');
  result += (days === 1 ) ? days + ' day ' : (days > 0 ? days+' days ' : '');

  return result;   
}


