import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import EmailList from '../EmailList'
import { setCurrentLabels } from '../../Store/labelsSlice'

const LABEL = ['SENT']

const mapStateToProps = (state) => {
  const { baseLoaded } = state
  return { baseLoaded }
}

const Spam = ({ baseLoaded, dispatch }) => {
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(LABEL))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default connect(mapStateToProps)(Spam)
