import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



export default () => {

    // Dados
    const dados = require('./../data/year.json');
    let dados_formatados = [];
    for (let i = 0; i < dados.x.length; i++) {
        dados_formatados[i] = { Ano: dados.x[i].substring(0, 4), Valor: dados.y[i] }
    }

    return (
        <div className="grafico">
            <p id="titulo">Estatísticas</p>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart className='chart'
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
                    <Tooltip contentStyle={{ backgroundColor: '#000' }} />
                    <Legend width={80} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#000', border: '1px solid #d5d5d5', borderRadius: 8, lineHeight: '40px' }} />
                    <Bar dataKey="Valor" stackId="a" fill="#388CA6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

