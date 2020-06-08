import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.idx} {props.exercises}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part idx={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part idx={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part idx={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [{
      name: 'Fundamentals of react',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

