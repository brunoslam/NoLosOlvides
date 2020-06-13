import React, { Component } from "react";
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import ReactWordcloud from 'react-wordcloud';
import { Resizable } from 're-resizable';
import { select } from 'd3-selection';
import Categoria from "model/categoria";
import Cargos from "model/cargos";
const resizeStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // border: 'solid 1px #ddd',
    // background: '#f0f0f0',
};
const options = {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
    // enableTooltip: true,
    // deterministic: false,
    // fontFamily: 'impact',
    // fontSizes: [5, 60],
    // fontStyle: 'normal',
    // fontWeight: 'normal',
    // padding: 1,
    rotations: 2,
    rotationAngles: [0, -90],
    // scale: 'sqrt',
    // spiral: 'archimedean',
    transitionDuration: 0,
};
export default class Categorias extends Component {
    constructor() {
        super();
        this.state = {
            categorias: [],
            cargos: [],
            words: []
        };
    }
    async componentWillMount() {
        var categoriasJSON = await Categoria.getCategorias();
        var cargosJSON = await Cargos.getCargos();
        var words = [];

        categoriasJSON.map((categoria) => {
            words.push({
                text: categoria.titulo,
                value: 64,
            });
        });
        cargosJSON.map((cargo) => {
            words.push({
                text: cargo.titulo,
                value: 64,
            });
        });

        this.setState({ categorias: categoriasJSON, cargos: cargosJSON, words: words });
    }
    callbacks = {
        // getWordColor: word => (word.value > 50 ? 'orange' : 'purple'),
        getWordTooltip: word =>
            `The word "${word.text}" appears ${word.value} times.`,
        onWordClick: this.getCallback('onWordClick'),
        onWordMouseOut: this.getCallback('onWordMouseOut'),
        onWordMouseOver: this.getCallback('onWordMouseOver'),
    };

    getCallback(callback) {
        return function (word, event) {
            const isActive = callback !== 'onWordMouseOut';
            const element = event.target;
            const text = select(element);
            text
                .on('click', () => {
                    if (isActive) {
                        window.open(`https://duckduckgo.com/?q=${word.text}`, '_blank');
                    }
                })
                .transition()
                .attr('background', 'white')
                .attr('font-size', isActive ? '300%' : '100%')
                .attr('text-decoration', isActive ? 'underline' : 'none');
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <TemplateNoLosOlvides>
                <div>
                    <Resizable
                        // defaultSize={{
                        //     width: 600,
                        //     height: 300,
                        // }}
                        style={resizeStyle}>
                        <div style={{ width: '100%', height: '100%' }}>
                            <ReactWordcloud callbacks={this.callbacks} words={this.state.words} options={options} />
                        </div>
                    </Resizable>
                </div>
            </TemplateNoLosOlvides>
        );
    }
}