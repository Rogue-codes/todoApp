import React from 'react'
import styled from 'styled-components'

const Tog = styled.button`
    background: ${props => props.bg};
`
function Check({check,handleCheck}) {
  return (
    <Tog bg={check ? 'lightgreen' : null} onClick={handleCheck}>Check</Tog>
  )
}

export default Check