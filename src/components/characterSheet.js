import React from "react";
import { Redirect } from "react-router-dom";
import Layout from '@wedgekit/layout';
import { Card, StackedCard } from '@wedgekit/core';

export default class CharacterSheet extends React.Component {
    constructor(props) {
        super(props);

        const redirect = (localStorage.getItem("values")) ? false : true;
        this.state = {
            redirect: redirect,
            values: JSON.parse(localStorage.getItem("values"))
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/character_form"/>
        }

        return(
            <Layout.Grid areas={ ['general'] }>
                <Layout.Section area="general">
                    <Card>
                        <h2>General Information</h2>
                        <StackedCard>{`Name: ${this.state.values.name}`}</StackedCard>
                    </Card>
                </Layout.Section>
            </Layout.Grid>
        );
    }
}
