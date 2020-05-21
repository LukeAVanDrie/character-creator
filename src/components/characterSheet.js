import React from "react";
import { Redirect } from "react-router-dom";
import Layout from '@wedgekit/layout';
import { Button, Card, StackedCard } from '@wedgekit/core';

const styles = {
    card: {
        margin: "3em 3em 0em 3em"
    },
    button: {
        margin: "3em auto",
        width: "35%",
    }
}

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

        const renderAncestry = () => {
            if (this.state.character.race.ancestry) {
                return <StackedCard>{`Draconic Ancestry: ${this.state.character.race.ancestry}`}</StackedCard>
            }
        }
        
        return(
            <Layout.Grid areas={ ["general", "proficiencies", "edit"] }>
                <Layout.Section area="general">
                    <Card style={ styles.card }>
                        <h2>General Information</h2>
                        <StackedCard>{`Name: ${this.state.character.name}`}</StackedCard>
                        <StackedCard>{`Race: ${this.state.character.race.name}`}</StackedCard>
                        { renderAncestry() }
                        <StackedCard>{`Languages: ${this.state.character.race.languages.join(", ") || "None"}`}</StackedCard>
                        <StackedCard>{`Size: ${this.state.character.race.size}`}</StackedCard>
                        <StackedCard>{`Speed: ${this.state.character.race.speed}ft`}</StackedCard>
                    </Card>
                </Layout.Section>
                <Layout.Section area="proficiencies">
                    <Card style={ styles.card }>
                        <h2>Proficiencies</h2>
                        <StackedCard>{`Weapons: ${this.state.character.race.weaponProfs.join(", ") || "None"}`}</StackedCard>
                        <StackedCard>{`Armor: ${this.state.character.race.armorProfs.join(", ") || "None"}`}</StackedCard>
                        <StackedCard>{`Tools: ${this.state.character.race.toolProfs.join(", ") || "None"}`}</StackedCard>
                    </Card>
                </Layout.Section>
                <Layout.Section area="edit">
                    <Button 
                        fullWidth  
                        domain="primary" 
                        onClick={ this.editCharacter } 
                        style={ styles.button }
                    >
                        Edit
                    </Button>
                </Layout.Section>
            </Layout.Grid>
        );
    }
}
