import './App.css'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p className="bold">Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <div>
    {parts.map((part) =>
      <Part key={part.id} part={part} />
    )}
  </div>

const Course = ({course}) => {
  const sum = course.parts.reduce((sum, part) => {
    return part.exercises + sum;
  }, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum}/>
    </div>
  )
}

export default Course;