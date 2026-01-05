"use client"
import React from 'react'
import { Button } from '@/components/ui/button'

const Page = () => {
    const [data, setData] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const handleClick = async () => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/demo', {
                method: 'POST',
            })
            const data = await response.json()
            console.log(data)
            setData(data.text)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div>
        <Button onClick={handleClick} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Click me'}
        </Button>
        {data && <p>{data}</p>}
    </div>
  )
}

export default Page