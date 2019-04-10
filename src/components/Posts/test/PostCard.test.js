import React from 'react';
import { shallow } from "enzyme";

import '../../../setupTest';

import PostCard from '../PostCard';

describe("<PostCard />", () => {
    it("Debe ejecutar el render conrrectamente", ()=>{
        const component = shallow(<PostCard/>);
        expect(component).toMatchSnapshot();
    })

    it("Debe pintar props", () => {
        const post = {
            id:"pruebaid",
            title:"Prueba post",
            author:{
                first_name:"Gerardo"
            }
        }

        const component = shallow(<PostCard
            id={post.id}
            title={post.title}
            first_name={post.author.first_name}
        />)

        expect(component.find(".card-text").text()).toBe(post.author.first_name)
    })
})