import React from "react";
import { Redirect } from "react-router-dom";
import Layout from '@wedgekit/layout';
import { Button, Card, StackedCard } from '@wedgekit/core';

export default class CharacterSheet extends React.Component {
    constructor(props) {
        super(props);

        const redirect = (localStorage.getItem("character")) ? false : true;
        this.state = {
            edit: false,
            redirect: redirect,
            character: JSON.parse(localStorage.getItem("character"))
        }

        this.editCharacter = this.editCharacter.bind(this);
    }

    async editCharacter() {
        this.setState({
            edit: true
        });
    }

    render() {
        if (this.state.edit || this.state.redirect) {
            return(
                <Redirect 
                    to={{
                        pathname: "/character_form", 
                        state: { edit: this.state.edit }
                    }}
                />
            );
        }
        
        return(
            <Layout.Grid areas={ ['general', 'edit'] }>
                <Layout.Section area="general">
                    <Card>
                        <h2>General Information</h2>
                        <StackedCard>{`Name: ${this.state.character.name}`}</StackedCard>
                    </Card>
                </Layout.Section>
                <Layout.Section area="edit">
                    <Button classname="edit" domain="primary" onClick={ this.editCharacter }>Edit</Button>
                </Layout.Section>
            </Layout.Grid>
        );
    }
}
