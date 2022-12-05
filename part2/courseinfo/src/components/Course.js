const Header = ({ heading }) => <h2>{heading}</h2>

const Content = ({ content }) => {
  return (
    <div>
      {content.map((part) =>
        <div>
          <Part part={part} />
          <br></br>
        </div>
      )}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div key={part.id}>{part.name} {part.exercises}</div>
  )
}

const Data = ({ data }) => {
  const totalExercises = data
    .map(part => part.exercises)
    .reduce((total, numExercises) => total + numExercises);

  return (
    <div>
      <strong>total of {totalExercises} exercises</strong>
    </div>
  )
}

const Course = ({ course }) => {
	return (
		<div key={course.id}>
			<Header heading={course.name} />
			<Content content={course.parts} />
			<Data data={course.parts} />
		</div>
	)
}

export default Course;
