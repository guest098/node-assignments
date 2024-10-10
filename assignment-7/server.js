const express=require('express');
const bodyparser=require('body-parser');
const fs=require('fs');
const path=require('path');
const moment=require('moment');
const app=express();
const port=8080;
app.use(bodyparser.json());
const loadData=()=>{
    const filePath=path.join(__dirname,'sales');
    const address=path.join(filePath,'address.json');
    const order=path.join(filePath,'order.json');
    addressdata=JSON.parse(fs.readFileSync(address,'utf-8'));
    orderdata=JSON.parse(fs.readFileSync(order,'utf-8'));
    salesData=orderdata.map(order=>{
        const customer=addressdata.find(customer=>customer.CustomerID===order['Customer ID']);
        return {
            ...order,...customer,CustomerName:`${customer.FirstName} ${customer.LastName}`,OrderAmount:parseFloat(order.OrderAmount.replace(/,/g,'')),OrderDate:moment(order.OrderDate,'DD-MM-YYYY').toDate(),DeliveryDate:moment(order.DeliveryDate,'DD-MM-YYYY').toDate()
        };
    });
};
loadData();
const formatCurrency=amount=>{
    return `$${amount.toLocaleString()}`;
}
const highestBusinessDate=()=>{
    const dailySales={};
    salesData.forEach(sale=>{
        const date=moment(sale.OrderDate).format('YYYY-MM-DD');
        const amount=parseFloat(sale.OrderAmount);
        if(!dailySales[date]){
            dailySales[date]=0;
        }
        dailySales[date]+=amount;
    });
    const highestDate=Object.keys(dailySales).reduce((maxi,date)=>{
       return dailySales[date]>dailySales[maxi]?date:maxi;
    });
    return {date:highestDate};
}
const customerdetails=()=>{
    const customer={};
    salesData.forEach(sale=>{
       const customerId=sale.CustomerID;
       const amount=parseFloat(sale.OrderAmount);
       if(!customer[customerId]){
        customer[customerId]={
            name:sale.CustomerName,
            address:sale.Address,
            totalOrderValue:0
        };
       }
       customer[customerId].totalOrderValue+=amount;
    });
    const customers=Object.values(customer);
    return {customers};
}
const percentageChangeBetweenWeeks=()=>{
    const weeklySales={};
    salesData.forEach(sale=>{
        const week=moment(sale.OrderDate).week();
        const amount=parseFloat(sale.OrderAmount);
        if(!weeklySales[week]){
            weeklySales[week]=0;
        }
        weeklySales[week]+=amount;
    });
    const allWeeks=Object.keys(weeklySales).map(Number).sort((a,b)=>a-b);
    if (allWeeks.length===0)return {};
    let currentWeek=allWeeks[0];
    const percentageChanges={};
    for (let i=0;i<allWeeks.length-1;i++){
        const week1=allWeeks[i];
        const week2=allWeeks[i+1];
        const sales1=weeklySales[week1]||0;
        const sales2=weeklySales[week2]||0;
        if(sales1===0){
            percentageChanges[`week${week1}_to_week${week2}`]=sales2===0?'+0.00':'+Infinity';
        } 
        else{
            const change=((sales2-sales1)/sales1)*100;
            const formattedChange=`${change>0?'+':''}${change.toFixed(2)}`;
            percentageChanges[`week${week1}_to_week${week2}`]=formattedChange;
        }
    }
    return percentageChanges;
};
const highestBusinessByTypeInFirstMonth=()=>{
    const firstMonthSales={};
    if (salesData.length===0){
        console.log("No sales data available.");
        return {};
    }
    const dates=salesData.map(sale=>{
        const date=moment(sale.OrderDate,"DD-MM-YYYY",true);
        if(!date.isValid()){
            console.warn("Invalid date found:",sale.OrderDate);
        }
        return date;
    }).filter(date=>date.isValid());
    if(dates.length===0) {
        console.log("No valid dates found.");
        return {};
    }
    const firstMonth=moment.min(dates).startOf('month');
    salesData.forEach(sale=>{
        const orderDate=moment(sale.OrderDate,"DD-MM-YYYY",true);
        if (orderDate.isValid()&&orderDate.isSame(firstMonth,'month')) {
            const type=sale.TypeOfOrder;
            const amount=parseFloat(sale.OrderAmount);
            if(!firstMonthSales[type]){
                firstMonthSales[type]=0;
            }
            firstMonthSales[type]+=amount;
        }
    });
    const formattedSales={};
    for (const type in firstMonthSales){
        formattedSales[type]=`$${firstMonthSales[type].toLocaleString()}`;
    }
    return {"month1":formattedSales};
};
const weekwisesales=()=>{
   const weeksales={};
   salesData.forEach(sale=>{
      const week=moment(sale.OrderDate).week();
      const amount=parseFloat(sale.OrderAmount);
      if(!weeksales[week]){
        weeksales[week]={Retail:0,Wholesale:0,Overseas:0};
      }
      weeksales[week][sale.TypeOfOrder]+=amount;
   });
   const formated=Object.keys(weeksales).sort((a,b)=>parseInt(a)-parseInt(b)).reduce((acc,week,index)=>{
       const formattedweek=`week${index+1}`;
       acc[formattedweek]={};
       for(const i in weeksales[week]){
        acc[formattedweek][i]=formatCurrency(weeksales[week][i]);
       }       
       return acc;
   },{});
   return formated;
};
app.get('/highest-business-date', (req, res) => {
    res.json(highestBusinessDate());
});
app.get('/customers', (req, res) => {
    res.json(customerdetails());
});
app.get('/percentage-change',(req, res)=>{
    res.json(percentageChangeBetweenWeeks());
});
app.get('/highest-business-month1',(req,res)=>{
    res.json(highestBusinessByTypeInFirstMonth());
});
app.get('/weekwise',(req, res)=>{
    res.json(weekwisesales());
});
app.listen(port,()=>{
    console.log(`port is listening at ${port}`);
});