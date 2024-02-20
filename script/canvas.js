const submit_btn = document.getElementById('submit');
const ipotek_chart = document.getElementById('ipotek-chart')

let result_month = document.getElementById('result-month')
let result_summ = document.getElementById('result-summ')
let result_overpayment = document.getElementById('result-overpayment')

let type_payment = document.getElementById('type-payment')
let summ_field = document.getElementById("summ")
let first_payment_field = document.getElementById("first-payment")
let percent_field = document.getElementById("percent")
let percent_up = document.getElementById("percent-up")
let age_field = document.getElementById('age')

if (+age_field.value>50){
    age_field.value = 50
}



function annuity_payment(year=1, summ_credita=1, first_payment=1, stavka_percent_year=1) {
    let data = []
    let data_percent = []
    let data_main = []

    
    month_stavka = stavka_percent_year / 12 / 100

    summ = summ_credita - first_payment
    all_rate = (1 + month_stavka) ** (year * 12)
    month_payment = summ * month_stavka * all_rate / (all_rate - 1)
    all_summ = year * 12 * month_payment

    percen_part = summ * month_stavka
    main_part = month_payment - percen_part

    all = first_payment
    x = 0

    for (let i = 1; i < 12 * year + 1; i++) {
        x += 1
        if (x===12){
            data_main.push(Math.round(main_part,2))
            data_percent.push(Math.round(percen_part,2))
            x=1
        }
        
        percen_part = summ * month_stavka
        main_part = month_payment - percen_part

        
        summ = summ - main_part

        all = all + percen_part + main_part
    }

    overpayment = all - summ_credita
    data.push(month_payment)
    data.push(all)
    data.push(overpayment)

    data_object = {
        date:data,
        date_percent:data_percent,
        date_main:data_main,
    }

    return data_object
}


function differentiated_payment() { }

function formator(str) {
    return (Number(str.replace(/[^.\d]/g, '')));
}


function range(end) {
    let result = [];
    for (let i = 1; i !== end + 1; i++) {
        result.push(i+2023 + ' г.');
    }

    return result;
}




let ctx = document.getElementById('ipotek-chart');



let data = {
    label: 'ГРа',
    labels: range(10),
    datasets: [{
        label: "Тело кредита",
        backgroundColor: "rgba(242, 36, 36,0.7)",
        borderColor: "rgba(242, 36, 36,1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(242, 36, 36,0.9)",
        hoverBorderColor: "rgba(242, 36, 36,1)",
        data: [65, 59, 20, 81, 56, 55, 40, 59, 20, 81],
    },
    {
        label: "Проценты банка",
        backgroundColor: "rgba(242, 36, 36,0.3)",
        borderColor: "rgba(242, 36, 36, 1)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(242, 36, 36,0.5)",
        hoverBorderColor: "rgba(242, 36, 36,1)",
        data: [85, 89, 80, 91, 56, 55, 40, 59, 20, 81],
    }]
};


let options = {
    maintainAspectRatio: false,
    scales: {
        y: {
            suggestedMin: 0,
            suggestedMax: 0,
            stacked: true,
            grid: {
                display: true,
                color: "rgba(255,99,132,0.2)"
            }
        },
        x: {
            stacked: true,
            grid: {
                display: false
            }
        }
    }
};

let my_chart = new Chart(ctx, {
    type: 'bar',
    options: options,
    data: data
});



submit_btn.onclick = function () {

    document.getElementById("account").style.display = "block"; 


    date = annuity_payment(formator(age_field.value), formator(summ_field.value), formator(first_payment_field.value), formator(percent_up.value))
    
    result_month.innerHTML = Math.round(date.date[0],2) + ' руб.'
    result_summ.innerHTML = Math.round(date.date[1],2) + ' руб.' + ' (' + Math.round(((date.date[1])/formator(summ_field.value)*100),2) + ' %)'
    result_overpayment.innerHTML = Math.round(date.date[2],2) + ' руб.' + ' (' + Math.round(((date.date[1])/formator(summ_field.value)*100-100),2) + ' %)'


    my_chart.data.datasets[0].data = date.date_main
    my_chart.data.datasets[1].data = date.date_percent
    my_chart.options.scales.y.suggestedMax = date.date[0]

    my_chart.data.labels = range(formator(age_field.value))

    my_chart.update()
}