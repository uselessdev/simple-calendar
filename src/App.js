import React, { Component } from 'react'
import moment, { weekdaysMin } from 'moment'
import classnames from 'classnames'

const columnDay = (index, days) => {
  if (index === 0) {
    return days[0].day() + 1
  }
}

const today = day => moment().isSame(day, 'day')
const month = (date = new Date()) => moment(date).format('MMMM')

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      days: [],
    }
  }

  componentDidMount () {
    this.updateMonthDays()
  }

  updateMonthDays = () => {
    const monthDate = moment().startOf('month')

    this.setState({
      days: [...Array(monthDate.daysInMonth())].map((_, i) => monthDate.clone().add(i, 'day')),
    })
  }

  render () {
    const { days } = this.state

    return (
      <div className="calendar">
        <h5 className="calendar-title">{month()}</h5>

        <div className="calendar-days">
          {weekdaysMin().map(day => (
            <strong key={day} className="calendar-weekday">{ day }</strong>
          ))}

          {days.map((day, index) => (
            <span
              key={day.format('lll')}
              className={
                classnames('calendar-day', {
                  today: today(day),
                })
              }
              style={{
                gridColumn: columnDay(index, days),
              }}
            >
              { day.format('D') }
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default App
