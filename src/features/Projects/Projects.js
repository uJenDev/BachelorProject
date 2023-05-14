import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { selectUser } from '../../slices/userSlice';
import Posts from '../Posts/Posts'
import ProjectTab from './views/ProjectTab';

const Projects = () => {
  
    const [height, setHeight] = useState(window.innerHeight)
    useEffect(() => {
        const handleWindowResize = () => setHeight(window.innerHeight)
        window.addEventListener('resize', handleWindowResize)
        
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    const user = useSelector(selectUser)
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true)
      const getProjects = onSnapshot(
          query(
            collection(db, 'projects'),
            where('members', 'array-contains-any', [
              {uid: user.uid, isAdmin: true, email: user.email, displayName: user.displayName}, 
              {uid: user.uid, isAdmin: false, email: user.email, displayName: user.displayName}
          ])
          ),
          (snapshot) => {
            setProjects(snapshot.docs.map(doc => ({
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
          getProjects()
      }
  }, [])

  // const location = useLocation();

  // const queryParams = new URLSearchParams(location.search);
  // const test = queryParams.get('test');

  const [selectedProject, setSelectedProject] = useState(null);

  const [projectIds, setGroupIds] = useState(null);
  useEffect(() => {
    if (projects) {
      setGroupIds(projects.map(project => project.id))
    }
  }, [projects])

  const groupId = useParams().project;
  useEffect(() => {
    (groupId && projects) ? setSelectedProject(projects.find(project => project.id === groupId)) : setSelectedProject(null)
  }, [groupId, projects])


  return (
    <div className='flex flex-row w-full' style={{height: height - 82}}>
        <ProjectTab 
            projects={projects}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
        />
        {(projectIds && !loading) && (
            <Posts 
                selectedProject={selectedProject}
                projectIds={projectIds}
                projects={projects}
            />
        )}
    </div>
  )
}

export default Projects
