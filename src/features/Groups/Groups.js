import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { selectUser } from '../../slices/userSlice';
import Posts from '../Posts/Posts'
import GroupsTab from './views/GroupsTab';

const Groups = () => {
  
    const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        const handleWindowResize = () => setHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    const user = useSelector(selectUser)
    const [groups, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
      const getGroups = onSnapshot(
          query(
            collection(db, 'groups'),
            where('members', 'array-contains-any', [
              {uid: user.uid, isAdmin: true, email: user.email, displayName: user.displayName}, 
              {uid: user.uid, isAdmin: false, email: user.email, displayName: user.displayName}
          ])
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

  // const location = useLocation();

  // const queryParams = new URLSearchParams(location.search);
  // const test = queryParams.get('test');

  const [selectedGroup, setSelectedGroup] = useState(null);

  const [groupIds, setGroupIds] = useState(null);
  useEffect(() => {
    if (groups) {
      setGroupIds(groups.map(group => group.id))
    }
  }, [groups])

  const groupId = useParams().group;
  useEffect(() => {
    (groupId && groups) ? setSelectedGroup(groups.find(group => group.id === groupId)) : setSelectedGroup(null)
  }, [groupId, groups])


  return (
    <div className='flex flex-row w-full' style={{height: height - 82}}>
        <GroupsTab 
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
