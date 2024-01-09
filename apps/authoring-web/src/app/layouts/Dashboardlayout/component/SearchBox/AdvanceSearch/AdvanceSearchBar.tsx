import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { categoryData, contentPaths } from '../../../../../utils/constant'
import AdvanceFilter from './AdvanceFilter'
import AllCatCta from './AllCatCta'
import AutoCompleteSearch from './AutoCompleteSearch'

type FiltersObj = {
  tags?: string[]
  author?: string
  fromDate?: string
  toDate?: string
}

export default function AdvanceSearchBar({ handleClose }) {
  const [selectedCategory, setSelectedCategory] = useState({
    icon: categoryData[0].icon,
    title: categoryData[0].title,
    category: categoryData[0].category,
  })
  const location = useLocation()
  const [filtersObj, setFiltersObj] = useState<FiltersObj>({})
  const [searchKeyword, setSearchKeyword] = useState('')
  const navigate = useNavigate()
  // const { dispatch } = useContext(Store); TO DO
  const setCategory = (category) => {
    setSelectedCategory(category)
  }

  useEffect(() => {
    setSelectedCategory(selectedCategory)
    setSearchKeyword(searchKeyword)
  }, [selectedCategory, searchKeyword])

  useEffect(() => {
    setFiltersObj(() => filtersObj)
  }, [filtersObj])

  const handleFilters = (obj) => {
    setFiltersObj(obj)
  }

  const handleSearchKeyword = useCallback(
    (value) => {
      setSearchKeyword(value)
    },
    [searchKeyword],
  )

  const getDateFormat = (date) => {
    const newDate = new Date(date)
    return `${newDate.getFullYear()}-${
      newDate.getMonth() + 1 < 10
        ? `0${newDate.getMonth() + 1}`
        : newDate.getMonth() + 1
    }-${newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate()}`
  }
  const handleSearch = (filters) => {
    // dispatch({ type: 'CLEAR_CONTENT' }); // TODO

    const path = contentPaths.find(
      (o) => o.ContentType === selectedCategory.category,
    )

    if (path) {
      localStorage.setItem('contentType', selectedCategory.title)
      localStorage.setItem('searchKeyword', searchKeyword)
      localStorage.setItem('searchTags', filters.tags)
      localStorage.setItem('author', filters.author)
      navigate(path.Url, {
        state: {
          searchTerm: searchKeyword,
          tags: filters.tags,
          author: filters.author,
          fromDate: filters.fromDate && getDateFormat(filters.fromDate),
          toDate: filters.toDate && getDateFormat(filters.toDate),
        },
      })
    } else {
      // Handle the case where 'path' is undefined
      console.error('Path is undefined')
    }

    handleClose()
  }

  return (
    <Box className="advSearch" component="form">
      <Box className="leftCol">
        <AllCatCta setCategory={setCategory} />
        <Box className="searchwp">
          <AutoCompleteSearch
            selectedCategory={selectedCategory}
            handleSearchKeyword={handleSearchKeyword}
            handleSearch={handleSearch}
            filters={filtersObj}
          />
        </Box>
      </Box>
      <AdvanceFilter
        handleFilters={handleFilters}
        handleSearchData={handleSearch}
      />
    </Box>
  )
}
