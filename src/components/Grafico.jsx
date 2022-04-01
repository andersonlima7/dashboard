import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default () => {

    // Dados
    const dados = require('./../data/year.json');
    let dados_formatados = [];
    for (let i = 0; i < dados.x.length; i++) {
        dados_formatados[i] = { Ano: dados.x[i].substring(0, 4), Valor: dados.y[i] }
    }

    console.log(dados_formatados);
    /* 
        {Ano: 2017, Valor: 1000
        Ano:2018, Valor: 2000}

    */


    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    console.log(data);


    // const data = [
    //     { name: 'Geeksforgeeks', students: 400 },
    //     { name: 'Technical scripter', students: 700 },
    //     { name: 'Geek-i-knack', students: 200 },
    //     { name: 'Geek-o-mania', students: 1000 }
    // ];



    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={300}
                height={200}
                data={dados_formatados}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Ano" />
                <YAxis dataKey="Valor" />
                <Tooltip />
                <Legend width={80} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <Bar dataKey="Valor" stackId="a" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}

