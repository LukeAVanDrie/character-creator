import React from "react";
import { Redirect } from "react-router-dom";
import { Input, Button, Card, Dropdown } from "@wedgekit/core";
import Form, { Field } from "@wedgekit/form";
import { Character } from "../models/bundle";
import { 
    Dragonborn, HillDwarf, MountainDwarf,
    HighElf, WoodElf, DarkElf,
    ForestGnome, RockGnome, HalfElf,
    LightfootHalfling, StoutHalfling, HalfOrc,
    Human, Tiefling, Race 
} from "../models/races/bundle";
import { LanguageEnum, ToolEnum, AncestryEnum, SizeEnum } from "../models/enums/bundle"; 

const styles = {
    card: {
        margin: "3em auto",
        width: "50%",
    },
    button: {
        margin: "1em auto",
        width: "35%"
    }
}

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

            // dropdowns
            subraceDropdown: false,
            languageDropdown: false,
            toolProficiencyDropdown: false,
            ancestryDropdown: false,

            // character properties
            character: character,
            race: character ? character.race : undefined,

            // form data
            formName: formData ? formData.formName : "",
            formRace: formData ? formData.formRace : undefined,
            formSubrace: formData ? formData.formSubrace : undefined,
            formLanguage: formData ? formData.formLanguage : undefined,
            formToolProficiency: formData ? formData.formToolProficiency : undefined,
            formAncestry: formData ? formData.formAncestry : undefined 
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validCharacter = this.validCharacter.bind(this);
        this.generateRace = this.generateRace.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
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

        // update formData
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
            subraceDropdown: this.state.formSubrace && (!races[this.state.formSubrace] || Race.getSubraces(this.state.formRace)),
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

    componentDidMount() {
        this.generateRace();
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to="/character_sheet"/>
        }

        const renderSubraceDropdown = () => {
            if (this.state.subraceDropdown) {
                return (
                    <Field
                        name="subRace"
                        label="Subrace"
                    >
                        {({ fieldProps }) => <Dropdown { ...fieldProps } 
                            options={ Race.getSubraces(this.state.formRace) } 
                            selected={ this.state.formSubrace }
                            onSelect={ selection => {
                                this.setState({ formSubrace: selection }, () => {
                                    this.generateRace();
                                });
                            }}
                            caret/>
                        }
                </Field>
                );
            }
        }

        const renderLanguageDropdown = () => {
            if (this.state.languageDropdown) {
                let languages = Object.keys(LanguageEnum).map(language => {
                    return { id: language, display: LanguageEnum[language] };
                });

                return (
                    <Field
                        name="language"
                        label="Additional Language"
                    >
                        {({ fieldProps }) => <Dropdown { ...fieldProps } 
                            options={ languages }
                            selected={ this.state.formLanguage }
                            onSelect={ selection => {
                                this.setState({ formLanguage: selection }, () => {
                                    this.generateRace();
                                }); 
                            }}
                            caret/>
                        }
                </Field>
                );
            }
        }

        const renderToolProficiencyDropdown = () => {
            if (this.state.toolProficiencyDropdown) {
                const tools = Object.keys(ToolEnum).map(tool => {
                    return { id: tool, display: (tool.charAt(0) + tool.substring(1).toLowerCase()) }
                });

                return (
                    <Field
                        name="tool"
                        label="Tool Proficiency"
                    >
                        {({ fieldProps }) => <Dropdown { ...fieldProps } 
                            options={ tools }
                            selected={ this.state.formToolProficiency }
                            onSelect={ selection => {
                                this.setState({ formToolProficiency: selection }, () => {
                                    this.generateRace();
                                }); 
                            }}
                            caret/>
                        }
                </Field>
                );
            }
        }

        const renderAncestryDropdown = () => {
            if (this.state.ancestryDropdown) {
                const ancestries = Object.keys(AncestryEnum).map(ancestry => {
                    return { id: ancestry, display: AncestryEnum[ancestry] };
                });

                return (
                    <Field
                        name="ancestry"
                        label="Draconic Ancestry"
                    >
                        {({ fieldProps }) => <Dropdown { ...fieldProps } 
                            options={ ancestries }
                            selected={ this.state.formAncestry }
                            onSelect={ selection => {
                                this.setState({ formAncestry: selection }, () => {
                                    this.generateRace();
                                }); 
                            }}
                            caret/>
                        }
                </Field>
                );
            }
        }

        return (
            <Card style={ styles.card }>
                <h2>Create Your Character</h2>
                <Form onSubmit={ this.handleSubmit }>
                {({ formProps, submitting }) => (
                    <form { ...formProps }>
                        <Field
                            name="name"
                            label="Name"
                            defaultValue={ this.state.formName }
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
                            {({ fieldProps }) => <Dropdown { ...fieldProps } 
                                options={[
                                    { id: "Dragonborn", display: "Dragonborn" },
                                    { id: "Dwarf", display: "Dwarf" },
                                    { id: "Elf", display: "Elf" },
                                    { id: "Gnome", display: "Gnome" },
                                    { id: "HalfElf", display: "Half-Elf" },
                                    { id: "Halfling", display: "Halfling" },
                                    { id: "HalfOrc", display: "Half-Orc" },
                                    { id: "Human", display: "Human" },
                                    { id: "Tiefling", display: "Tiefling" }
                                ]} 
                                selected={ this.state.formRace }
                                onSelect={ selection => {
                                    this.setState({ formRace: selection, formSubrace: selection }, () => {
                                        this.generateRace();
                                    });
                                }}
                                caret/>
                            }
                        </Field>
                        { renderSubraceDropdown() }
                        { renderLanguageDropdown() }
                        { renderToolProficiencyDropdown() }
                        { renderAncestryDropdown() }
                        <Button 
                            fullWidth 
                            domain="primary" 
                            type="submit" 
                            disabled={ submitting || !this.validCharacter() } 
                            style={ styles.button }
                        >
                            { localStorage.getItem("formData") ? "Save" : "Create" }
                        </Button>
                    </form>
                )}
                </Form>
            </Card>
        );
    }
}
