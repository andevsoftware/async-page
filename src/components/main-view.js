import {createElement as h, Component} from "react";
import $ from "jquery";

export default class MainView extends Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            startTime: new Date().getTime()
        };
    }

    componentDidMount() {

        setInterval(() => {
            this.setState({
                currentTime: new Date().getTime()
            });
        }, 10);

        $.ajax({
            method: 'GET',
            url: 'api/movies.json'
        }).then(result => {

            this.setState({
                items: result,
                loading: false,
                loadedTime: new Date().getTime()
            });
        });
    }

    render() {
        return h('div', null,
            this.renderBody(),
            this.renderFooter()
        );
    }

    renderBody() {

        if (this.state.loading) {
            return h('div', null, `loading content...`);
        }

        return h('div', {
                className: 'container'
            },
            h('h2', null, 'List of movies'),
            h('p', null, `Loaded in ${this.state.loadedTime - this.state.startTime}ms`),
            h('ul', null, this.state.items.map((item, index) => {
                return h('li', {
                    key: index
                }, `${item.title} - ${item.year}`)
            }))
        );
    }

    renderFooter() {

        return h('div', null,
            h('hr'),
            h('div', null, `time on page: ${this.state.currentTime - this.state.startTime}ms`)
        );
    }
}
