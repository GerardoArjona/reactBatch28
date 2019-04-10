import React from 'react';
import { mount, shallow } from 'enzyme';

import { MockedProvider } from 'react-apollo/test-utils';

import '../../../setupTest';

import PostDetail from '../PostDetail';

import gql from 'graphql-tag';

const SINGLEPOST = gql`
    query SinglePost($id:ID){
        Post(id:$id){
            title,
            content,
            category
        }
    }
`

const mocks = [
    {
        request:{
            query:SINGLEPOST,
            variables:{
                id:"prueba...id"
            }
        },
        result:{
            data:{
                post:{_id:"prueba...id", title:"Prueba", content:"Contenido Prueba", category:"TECH"}
            }
        }
    }
]

describe("<PostDetail/>", ()=>{
    it("Debe ejecutar el render correctamente", () => {
        const component = shallow(<PostDetail/>)
        expect(component).toMatchSnapshot();
    });

    it("El estado debe inicializarse con el ID", () => {
        const match = {
            params:{
                id:"prueba...id"
            }
        }

        const component = mount(
            <MockedProvider
            mocks={mocks}
            addTypename={false}>
                <PostDetail match={match}/>
            </MockedProvider>
        )

        expect(component).toBe({});
    })
})