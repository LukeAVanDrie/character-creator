import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import dotProp from "dot-prop";
import { Input, Button, Card, Select, Option } from "@wedgekit/core";
import Form, { Field } from "@wedgekit/form";
import { Character } from "../models/bundle";
import { 
    Dragonborn, HillDwarf, MountainDwarf,
    HighElf, WoodElf, DarkElf,
    ForestGnome, RockGnome, HalfElf,
    LightfootHalfling, StoutHalfling, HalfOrc,
    Human, Tiefling, Race 
} from "../models/races/bundle";
import { LanguageEnum, ToolEnum, AncestryEnum } from "../models/enums/bundle"; 

const StyledCard = styled(Card)`
    margin: 3em auto;
    width: 50%;
`

const StyledButton = styled(Button)`
    margin: 1em auto;
    width: 35%;
`

export default class CharacterForm extends React.Component {
    constructor(props) {
        super(props);

        const redirect = 
        (localStorage.getItem("other") && !props.location.state.edit) 
            ? true 
            : false;
        
        const character = localStorage.getItem("character")
            ? JSON.parse(localStorage.getItem("character")) 
            : undefined;

        const formData = localStorage.getItem("formData")
            ? JSON.parse(localStorage.getItem("formData"))
            : undefined;

        this.state = { 
            // miscellaneous
            redirect: redirect,

            // character properties
            character: character,
            race: dotProp.get(character, "race"),

            // form data
            formName: dotProp.get(formData, "formName", ""),
            formRace: dotProp.get(formData, "formRace"),
            formSubrace: dotProp.get(formData, "formSubrace"),
            formLanguage: dotProp.get(formData, "formLanguage"),
            formToolProficiency: dotProp.get(formData, "formToolProficiency"),
            formAncestry: dotProp.get(formData, "formAncestry"), 

            // render data
            subraceDropdown: dotProp.has(formData, "formRace") && Race.getSubraces(formData.formRace) !== undefined,
            languageDropdown: dotProp.has(formData, "formLanguage"),
            toolProficiencyDropdown: dotProp.has(formData, "formToolProficiency"),
            ancestryDropdown: dotProp.has(formData, "formAncestry")
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validCharacter = this.validCharacter.bind(this);
        this.generateRace = this.generateRace.bind(this);
    }

    handleSubmit = async () => {
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);

        // generate / modify character and save to local storage
        let character = this.state.character;
        if (!character) {
             character = new Character(this.state.formName, this.state.race);
        } else {
            character.name = this.state.formName;
            character.race = this.state.race;
        }

        localStorage.setItem("character", JSON.stringify(character));

        // update form data
        const formData = {
            formName: this.state.formName,
            formRace: this.state.formRace,
            formSubrace: this.state.subraceDropdown ? this.state.formSubrace : undefined,
            formLanguage: this.state.languageDropdown ? this.state.formLanguage : undefined,
            formToolProficiency: this.state.toolProficiencyDropdown ? this.state.formToolProficiency : undefined,
            formAncestry: this.state.ancestryDropdown ? this.state.formAncestry : undefined
        }

        localStorage.setItem("formData", JSON.stringify(formData));

        this.setState({
            redirect: true
        });
    }

    validCharacter() {
        let character = this.state.character;
        if (!character) {
             character = new Character(this.state.formName, this.state.race);
        } else {
            character.name = this.state.formName;
            character.race = this.state.race;
        }

        let validCharacter = true;
        Object.keys(character).forEach(key => {
            if (!character[key]) {
                validCharacter = false;
            }
        });

        return validCharacter;
    }

    generateRace = () => {
        const races = {
            Dragonborn, HillDwarf, MountainDwarf,
            HighElf, WoodElf, DarkElf,
            ForestGnome, RockGnome, HalfElf,
            LightfootHalfling, StoutHalfling, HalfOrc,
            Human, Tiefling
        };

        this.setState({
            subraceDropdown: this.state.formRace && Race.getSubraces(this.state.formRace) !== undefined,
            languageDropdown: false,
            toolProficiencyDropdown: false,
            ancestryDropdown: false
        }, () => {
            // validate race / subrace selection and render subrace dropdown if not valid
            if (races[this.state.formSubrace]) {
                const args = {
                    language: LanguageEnum[this.state.formLanguage],
                    toolProficiency: ToolEnum[this.state.formToolProficiency],
                    ancestry: AncestryEnum[this.state.formAncestry]
                }

                // generate instance of race / subrace, render required fields, and save if valid
                const result = races[this.state.formSubrace].generate(args);
                if (result.class instanceof races[this.state.formSubrace]) {
                    this.setState({
                        race: result.class
                    });
                }

                this.setState({
                    languageDropdown: result.requiredArgs.includes("language"),
                    toolProficiencyDropdown: result.requiredArgs.includes("toolProficiency"),
                    ancestryDropdown: result.requiredArgs.includes("ancestry")
                });
            }
        });
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to="/character_sheet"/>
        }

        const renderSubraceDropdown = () => {
            if (this.state.subraceDropdown) {
                let subraces = Race.getSubraces(this.state.formRace) || [];
                subraces = subraces.map(subrace => {
                    return <Option key={ subrace.id } value={ subrace.id }>{ subrace.display }</Option>
                });

                return (
                    <Field
                        name="subRace"
                        label="Subrace"
                    >
                        {({ fieldProps }) => (
                            <Select { ...fieldProps }
                                value={ this.state.formSubrace }
                                onChange={ value => {
                                    this.setState({ formSubrace: value }, () => {
                                        this.generateRace();
                                    });
                                }}
                                required
                            >
                                { subraces }
                            </Select>
                        )}
                    </Field>
                );
            }
        }

        const renderLanguageDropdown = () => {
            if (this.state.languageDropdown) {
                const languages = Object.keys(LanguageEnum).map(language => {
                    return <Option key={ language } value={ language }>{ LanguageEnum[language] }</Option>
                });

                return (
                    <Field
                        name="language"
                        label="Additional Language"
                    >
                        {({ fieldProps }) => 
                            <Select { ...fieldProps }
                                value={ this.state.formLanguage }
                                onChange={ value => {
                                    this.setState({ formLanguage: value }, () => {
                                        this.generateRace();
                                    });
                                }}
                                required    
                            >
                                { languages }
                            </Select>
                        }
                    </Field>
                );
            }
        }

        const renderToolProficiencyDropdown = () => {
            if (this.state.toolProficiencyDropdown) {
                const tools = Object.keys(ToolEnum).map(tool => {
                    return <Option key={ tool } value={ tool }>{ ToolEnum[tool] }</Option>
                });

                return (
                    <Field
                        name="tool"
                        label="Tool Proficiency"
                    >
                        {({ fieldProps }) => 
                            <Select { ...fieldProps }
                                value={ this.state.formToolProficiency }
                                onChange={ value => {
                                    this.setState({ formToolProficiency: value }, () => {
                                        this.generateRace();
                                    });
                                }}
                                required    
                            >
                                { tools }
                            </Select>
                        }
                    </Field>
                );
            }
        }

        const renderAncestryDropdown = () => {
            if (this.state.ancestryDropdown) {
                const ancestries = Object.keys(AncestryEnum).map(ancestry => {
                    return <Option key={ ancestry } value={ ancestry }>{ AncestryEnum[ancestry] }</Option>
                });

                return (
                    <Field
                        name="ancestry"
                        label="Draconic Ancestry"
                    >
                        {({ fieldProps }) => 
                            <Select { ...fieldProps }
                                value={ this.state.formAncestry }
                                onChange={ value => {
                                    this.setState({ formAncestry: value }, () => {
                                        this.generateRace();
                                    });
                                }}
                                required    
                            >
                                { ancestries }
                            </Select>
                        }
                    </Field>
                );
            }
        }

        return (
            <StyledCard>
                <h2>Create Your Character</h2>
                    <Form onSubmit={ this.handleSubmit }>
                    {({ formProps, submitting }) => (
                        <form { ...formProps }>
                            <Field
                                name="name"
                                label="Name"
                                defaultValue={ this.state.formName }
                                required
                            >
                                {({ fieldProps }) => <Input { ...fieldProps }
                                    onChange={ value => this.setState({ formName: value }) }
                                    fullWidth/>
                                }
                            </Field>
                            <Field
                                name="race"
                                label="Race"
                            >
                                {({ fieldProps }) => (
                                    <Select { ...fieldProps }
                                        value={ this.state.formRace }
                                        onChange={ value => {
                                            this.setState({ formRace: value, formSubrace: value }, () => {
                                                this.generateRace();
                                            });
                                        }}
                                        required    
                                    >
                                        <Option value="Dragonborn">Dragonborn</Option>
                                        <Option value="Dwarf">Dwarf</Option>
                                        <Option value="Elf">Elf</Option>
                                        <Option value="Gnome">Gnome</Option>
                                        <Option value="HalfElf">Half-Elf</Option>
                                        <Option value="Halfling">Halfling</Option>
                                        <Option value="HalfOrc">Half-Orc</Option>
                                        <Option value="Human">Human</Option>
                                        <Option value="Tiefling">Tiefling</Option>
                                    </Select>
                                )}
                            </Field>
                            { renderSubraceDropdown() }
                            { renderLanguageDropdown() }
                            { renderToolProficiencyDropdown() }
                            { renderAncestryDropdown() }
                            <StyledButton 
                                fullWidth 
                                domain="primary" 
                                type="submit" 
                                disabled={ submitting || !this.validCharacter() } 
                            >
                                { localStorage.getItem("formData") ? "Save" : "Create" }
                            </StyledButton>
                        </form>
                    )}
                </Form>
            </StyledCard>
        );
    }
}
