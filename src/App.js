import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import styled from 'styled-components'

import './App.css'

// Styled component for the ButtonTag
export const ButtonTag = styled.button`
  background-color: ${props => (props.isActive ? '#f3aa4e' : 'transparent')};
  color: white;
  font-weight: bold;
  margin-right: 10px;
  padding: 10px;
  margin-bottom:5px;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
`

// List of tags used in the application
const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    items: [], // Stores all tasks
    currentTask: '', // Current task input
    filteredItems: [], // Stores filtered tasks
    selectedTag: tagsList[0].optionId, // Selected tag from dropdown
    activeTag: 'INITIAL', // Currently active tag for filtering
  }

  // Updates the current task input value
  changeInputTask = event => {
    this.setState({currentTask: event.target.value})
  }

  // Updates the selected tag from the dropdown
  changingTags = event => {
    this.setState({selectedTag: event.target.value})
  }

  // Adds the task to the list of tasks
  addTheTaskToLists = event => {
    event.preventDefault() // Prevent form from reloading the page
    const {items, currentTask, selectedTag} = this.state

    if (currentTask.trim() !== '') {
      // Ensures task is not empty
      const newTask = {
        id: uuidv4(), // Unique ID for each task
        initialTask: currentTask, // Task description
        initialTag: selectedTag, // Associated tag
      }

      this.setState({
        items: [...items, newTask], // Adds new task to items array
        currentTask: '', // Resets task input field
        selectedTag: tagsList[0].optionId, // Resets dropdown to default value
        filteredItems: [], // Resets filtered items
        activeTag: 'INITIAL', // Resets active tag
      })
    }
  }

  // Filters tasks based on the selected tag
  addFilterTaskToList = tag => {
    const {items} = this.state
    const filteredItems = items.filter(
      filterItem => filterItem.initialTag === tag, // Filters tasks by tag
    )
    this.setState({filteredItems, activeTag: tag}) // Updates filtered items and active tag
  }

  render() {
    const {
      items,
      currentTask,
      activeTag,
      selectedTag,
      filteredItems,
    } = this.state
    const resultItems = filteredItems.length > 0 ? filteredItems : items // Determines whether to display filtered or all items

    return (
      <div className="bg-container">
        <div className="first-container">
          <div>
            <h1 className="heading">Create a task!</h1>
            <form className="form-container" onSubmit={this.addTheTaskToLists}>
              <div>
                <label className="label-heading" htmlFor="input-task">
                  Task
                </label>
                <br />
                <input
                  className="write-text"
                  id="input-task"
                  type="text"
                  value={currentTask}
                  onChange={this.changeInputTask} // Updates state with task input
                  placeholder="Enter the task here"
                />
              </div>
              <div>
                <label className="label-tags" htmlFor="input-tags">
                  Tags
                </label>
                <br />
                <select
                  className="select-tags"
                  value={selectedTag}
                  id="input-tags"
                  onChange={this.changingTags} // Updates state with selected tag
                >
                  {tagsList.map(selectTag => (
                    <option key={selectTag.optionId} value={selectTag.optionId}>
                      {selectTag.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <div className="button-container">
                <button className="button" type="submit">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="second-container">
          <div>
            <h1 className="heading-tag">Tags</h1>
            <ul className="list-container">
              {tagsList.map(eachTag => {
                const isActive = activeTag === eachTag.optionId // Checks if the tag is active
                return (
                  <li key={eachTag.optionId}>
                    <ButtonTag
                      isActive={isActive}
                      onClick={() => this.addFilterTaskToList(eachTag.optionId)} // Filters tasks by tag on click
                    >
                      {eachTag.displayText}
                    </ButtonTag>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h1 className="heading-tasks">Tasks</h1>
            <ul className="items-ul">
              {resultItems.length > 0 ? (
                resultItems.map(resultItem => (
                  <li key={resultItem.id}>
                    {/* Displaying task and tag as paragraph elements to match requirements */}
                    <div className="item-container">
                      <p className="item-color">{resultItem.initialTask}</p>
                      <button className="button-text">
                        {resultItem.initialTag}
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="paragraph">No Tasks Added Yet</p> // Message when no tasks are added
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default App
