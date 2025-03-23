// date-utils.ts  
export function timeAgo(date: Date): string {  
    const now = new Date();  
    const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);  

    if (secondsPast < 60) {  
        return `${secondsPast} seconds ago`;  
    } else if (secondsPast < 3600) {  
        const minutesPast = Math.floor(secondsPast / 60);  
        return `${minutesPast} minutes ago`;  
    } else if (secondsPast < 86400) {  
        const hoursPast = Math.floor(secondsPast / 3600);  
        return `${hoursPast} hours ago`;  
    } else if (secondsPast < 2592000) { // 30 days  
        const daysPast = Math.floor(secondsPast / 86400);  
        return `${daysPast} days ago`;  
    } else if (secondsPast < 31536000) { // 1 year  
        const monthsPast = Math.floor(secondsPast / 2592000);  
        return `${monthsPast} months ago`;  
    } else {  
        const yearsPast = Math.floor(secondsPast / 31536000);  
        return `${yearsPast} years ago`;  
    }  
}

export function expiration(date: any): string {  
    if (!date.adDuration || !date.adDuration.campaignEndDate) {
        return 'No expiration';
      }
    
      const endDate = new Date(date.adDuration.campaignEndDate).getTime();
      const currentDate = new Date().getTime();
      const timeDifference = endDate - currentDate;
    
      if (timeDifference <= 0) {
        return 'Expired';
      }
    
      const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
      return daysLeft > 0 ? `${daysLeft} days left` : `${hoursLeft} hours left`;
}