import React from "react";
import { Input, Button } from "@wedgekit/core";
import Form, { Field } from "@wedgekit/form";

export default class CharacterForm extends React.Component {
    handleSubmit = async values => {
        // submit delay
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(300);

        localStorage.setItem("values", JSON.stringify(values));

        // placeholder for re-route to character sheet
        window.alert(localStorage.getItem("values"));
    }
    
    render() {
        return (
            <Form onSubmit={ this.handleSubmit }>
              {({ formProps, submitting }) => (
                  <form { ...formProps }>
                      <Field
                        name="name"
                        label="Name"
                        defaultValue={ localStorage.getItem("values")
                            ?  JSON.parse(localStorage.getItem("values")).name
                            : "" 
                        }
                      >
                          {({ fieldProps }) => <Input { ...fieldProps } />}
                      </Field>
                      <Button domain="primary" type="submit" disabled={ submitting }>
                          { localStorage.getItem("values") ? "Save" : "Create" }
                      </Button>
                  </form>
              )}
            </Form>
        );
    }
}
