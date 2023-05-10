import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../firebase';
import { selectUser } from '../../slices/userSlice';
import Posts from '../Posts/Posts'
import GroupsHeader from './views/GroupsHeader';

const Groups = () => {

    const user = useSelector(selectUser)
    const [groups, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
      const getGroups = onSnapshot(
          query(
            collection(db, 'groups'),
            where('members', 'array-contains-any', [{uid: user.uid, isAdmin: true}, {uid: user.uid, isAdmin: false}])
          ),
          (snapshot) => {
            setData(snapshot.docs.map(doc => ({
                  id: doc.id,
                  ...doc.data()
            })))
            setLoading(false)
      },
      (error) => {
          console.log(error)
          setLoading(false)
      })
      return () => {
          getGroups()
      }
  }, [])

  const [groupIds, setGroupIds] = useState(null);

  useEffect(() => {
    if (groups) {
      setGroupIds(groups.map(group => group.id))
    }
  }, [groups])

  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className='flex flex-row w-full'>
        <GroupsHeader 
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
        />
        {(groupIds && !loading) && (
            <Posts 
                selectedGroup={selectedGroup}
                groupIds={groupIds}
                groups={groups}
            />
        )}
    </div>
  )
}

export default Groups