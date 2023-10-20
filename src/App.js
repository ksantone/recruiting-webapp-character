import React, { Component, useState } from 'react';
import { Grid } from '@mui/material'
import './App.css';
import { Attribute, Class, Skill } from './CharacterSheet.js';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      attributes_to_pluses: {},
      isOfClass: {},
      attribute_list: ATTRIBUTE_LIST.map((x) => x),
      class_dict: {},
      class_list: Object.keys(CLASS_LIST).map((x) => x),
      points_for_skills: 0,
      skill_values: {}
    }
    Object.assign(this.state.class_dict, CLASS_LIST);
    for (const attr of ATTRIBUTE_LIST) {
      this.state.attributes_to_pluses[attr] = 0;
    }

    let attribute_values = {};
    let keys = Object.keys(this.state.attributes_to_pluses);
    for (let i = 0; i < keys.length; i++) {
      attribute_values[keys[i]] = this.state.attributes_to_pluses[keys[i]] + 10;
    }

    // The data gets posted but fails to get fetched later on (point 6 was not completed in time)
    fetch('https://recruiting.verylongdomaintotestwith.ca/api/{ksantone}/character', {
      method: 'POST',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(attribute_values)
    });

    for (const skill of SKILL_LIST) {
      this.state.skill_values[skill.name] = 0;
    }
    for (const class_type of Object.keys(CLASS_LIST)) {
      this.state.isOfClass[class_type] = {color:"black"};
    }
  }

  incrementAttr = (attr_name) => {
    let updated_attributes_to_pluses = this.state.attributes_to_pluses;
    updated_attributes_to_pluses[attr_name] += 1;
    this.setState({attributes_to_pluses: updated_attributes_to_pluses});
    
    for (const class_type in CLASS_LIST) {
      this.isOfClassType(class_type);
    }
  }
  
  decrementAttr = (attr_name) => {
    let updated_attributes_to_pluses = this.state.attributes_to_pluses;
    updated_attributes_to_pluses[attr_name] -= 1;
    this.setState({attributes_to_pluses: updated_attributes_to_pluses});

    for (const class_type in CLASS_LIST) {
      this.isOfClassType(class_type);
    }
  }

  incrementSkill = (skill_name) => {
    if (10+4*Math.floor(this.state.attributes_to_pluses["Intelligence"]/2) - SKILL_LIST.reduce((partial_sum, skill) => partial_sum + this.state.skill_values[skill.name], 0) == 0) {
      // Should actually have this as a state variable to make code cleaner but not enough time
      alert("You need more skill points!");
      return;
    }

    let updated_skill_values = this.state.skill_values;
    updated_skill_values[skill_name] += 1;
    this.setState({skill_values: updated_skill_values})
  }

  decrementSkill = (skill_name) => {
    if (this.state.skill_values[skill_name]==0) {
      alert("You cannot have negative skills!");
      return;
    }

    let updated_skill_values = this.state.skill_values;
    updated_skill_values[skill_name] -= 1;
    this.setState({skill_values: updated_skill_values})
  }

  isOfClassType = (class_type) => {
    let isOrange = false;
    for (var i = 0; i < this.state.attribute_list.length; i++) {
      if (10 + this.state.attributes_to_pluses[this.state.attribute_list[i]] < this.state.class_dict[class_type][this.state.attribute_list[i]]) {
        this.state.isOfClass[class_type] = {color:"black"};
        this.setState({isOfClass: this.state.isOfClass}, () => {});
        return;
      }
    }
    this.state.isOfClass[class_type] = {color:"orange"};
    this.setState({isOfClass: this.state.isOfClass}, () => {});
  }

  updateApis = () => {
    //let response = fetch('https://recruiting.verylongdomaintotestwith.ca/api/%7Bksantone%7D/character');
    //console.log(response);
    //let text = response.text();
  }

  componentDidMount() {
    // This method did not seem to work for fetching data from the API so I'll not complete this aspect
    this.updateApis();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>React Coding Exercise - Kassim Santone</h1>
        </header>
        <Grid container xs={12}>
          <Grid item className="attributes" xs={4}>
            <h3>Attributes</h3>
            {ATTRIBUTE_LIST.map(
              attr => <Attribute attr_name={attr} attr_plus={this.state.attributes_to_pluses[attr]} incrementAttr={this.incrementAttr} decrementAttr={this.decrementAttr}/>
            )}
          </Grid>
          <Grid item className="classes" xs={4}>
            <h3>Classes</h3>
            {Object.keys(CLASS_LIST).map(
              class_type => <Class alert_message={this.state.class_dict[class_type]} class_type={class_type} isOfClass={this.state.isOfClass} />
            )}
          </Grid>
          <Grid item className="skills" xs={4}>
            <h3>Skills</h3>
            <h3>Total skill points available: {10+4*Math.floor(this.state.attributes_to_pluses["Intelligence"]/2) }</h3>
              {SKILL_LIST.map(
                skill => <Skill skill_name={skill.name} skill_value={this.state.skill_values[skill.name]} skill_modifier_type={skill.attributeModifier} skill_modifier_value={Math.floor(this.state.attributes_to_pluses[skill.attributeModifier])} incrementSkill={this.incrementSkill} decrementSkill={this.decrementSkill}/>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
