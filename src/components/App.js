import React from "react";
import {Item} from "./Item";

export class App extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            isLoading: false,
            enableAutoRefresh: false,
            minComments: 0,
        }
    }

    componentDidMount() {
        this.getItems();
    }

    updateAutoRefresh = () => {
        this.setState(
            state => ({
                enableAutoRefresh: !state.enableAutoRefresh
            }),
            () => {
                if (!this.state.enableAutoRefresh) {
                    clearInterval(this.autoRefresh);
                } else {
                    this.autoRefresh = setInterval(this.getItems, 4000);
                }
            }
        );
    };

    getItems = () => {
        this.setState({isLoading: true});

        fetch('https://www.reddit.com/r/reactjs.json?limit=100')
            .then((response) => response.json())
            .then(({data}) => {
                this.setState({
                    items: data.children,
                    isLoading: false,
                });
            });
    };

    updateMinComments = (e) => {
        this.setState({
            minComments: Number(e.target.value),
        });
    };

    getItemsByComments = (items, minComments) =>
        items
            .filter(item => item.data.num_comments >= minComments)
            .sort((a, b) => b.data.num_comments - a.data.num_comments);

    render() {

        const {items, isLoading, enableAutoRefresh, minComments} = this.state;
        const itemsByComments = this.getItemsByComments(items, minComments);
        return (
            <div>
                <h1>Top Commented</h1>
                <div>
                    <p>Current filter: {minComments}</p>
                    <button
                        type="button"
                        onClick={this.updateAutoRefresh}
                        style={{
                            marginBottom: '15px'
                        }}
                    >
                        {enableAutoRefresh ? 'Stop' : 'Start'} AutoRefresh
                    </button>
                </div>
                <input
                    type="range"
                    value={minComments}
                    onChange={this.updateMinComments}
                    min={0}
                    max={500}
                    style={{
                        width: '100%',
                        marginBottom: '15px'
                    }}
                />

                {isLoading ? (
                    <p>...Loading</p>
                ) : (
                    itemsByComments.length > 0 ? (
                        itemsByComments.map(
                            item => <Item key={item.data.id} data={item.data}/>
                        )
                    ) : (
                        <p>No result found</p>
                    )
                )}
            </div>
        )
    }
}
