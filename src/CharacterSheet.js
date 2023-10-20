export const Attribute = (props) => 
    (<div>
        <h3>{props.attr_name}: {10+props.attr_plus} (Modifier: {Math.floor(props.attr_plus/2)})</h3>
        <div>
            <button onClick={() => {props.incrementAttr(props.attr_name)}}>+</button>
            <button onClick={() => {props.decrementAttr(props.attr_name)}}>-</button>
        </div>
    </div>)

export const Class = (props) =>
    (<div>
        <button onClick={() => {alert(JSON.stringify(props.alert_message))}} style={props.isOfClass[props.class_type]}>{props.class_type}</button>
    </div>)

export const Skill = (props) =>
    (<div>
        <h3>{props.skill_name}: {props.skill_value} (Modifier: {props.skill_modifier_type}): {props.skill_modifier_value}</h3>
        <div>
            <button onClick={() => {props.incrementSkill(props.skill_name)}}>+</button>
            <button onClick={() => {props.decrementSkill(props.skill_name)}}>-</button>
        </div>
        <h3>Total: {props.skill_value+props.skill_modifier_value}</h3>
    </div>)