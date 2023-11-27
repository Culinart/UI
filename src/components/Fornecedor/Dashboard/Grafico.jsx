import React from "react";

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";


function Grafico({ chartData }) {

    const options = {
        layout: {
            padding: {
                top: 50 // Aumenta o espaço abaixo da legenda em 50px
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#045D53',
                }
            },
            y: {
                grid: {
                    display: true,
                },
                ticks: {
                    color: '#045D53',
                    callback: function (value, index, values) {
                        return value + "K";
                    }
                }
            }
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-12/12 h-[40rem] p-16">
                <div className="flex flex-col w-full mt-4">
                    <h1 className="text-[#045D53] text-lg">Atividade</h1>
                    <h1 className="text-[#045D53] text-xl font-bold mt-2">Assinatura de Usuários</h1>
                </div>
                <Bar
                    data={chartData}
                    options={options}
                    className="mb-2"
                />
            </div>
        </>
    )
}

export default Grafico;