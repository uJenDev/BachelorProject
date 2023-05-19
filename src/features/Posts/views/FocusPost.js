import React, { useEffect, useState } from 'react'
import CommentFeed from './CommentFeed';
import SettingsList from './SettingsList';
import { StlViewer } from "react-stl-viewer";
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../../firebase';
import PostSettingTable from '../components/PostSettingTable';
import PostSettingDetailsList from '../components/PostSettingDetailsList';


const costAnalysisCalculation = (post) => {
    if (!post) return;

    const materialCostPerPart = post?.setting?.part?.pricePerUnit;
            
    const defectRate = post?.setting?.operationalFactors?.defectRate;
    const defectCostPerPart = materialCostPerPart * (1/(1 - defectRate) - 1)

    const toolLife = post?.setting?.operationalFactors?.toolLife;
    const toolPrice = post?.setting?.tool?.price;
    const toolsCostPerPart = toolPrice / toolLife

    const cycleTime = post?.setting?.operationalFactors?.cycleTime;
    const coolantUsagePerPart = post?.setting?.operationalFactors?.coolantUsage / 60 * cycleTime;
    const coolantPrice = post?.setting?.coolant?.pricePerLiter;
    const coolantCostPerPart = coolantPrice * coolantUsagePerPart

    const totalCostPerPart = defectCostPerPart + toolsCostPerPart + coolantCostPerPart

    return {
        materialCostPerPart,
        defectCostPerPart,
        toolsCostPerPart,
        coolantCostPerPart,
        totalCostPerPart,
    }
}


const FocusPost = ({
    post,
    comparedPost,
    user,
    breakpoint,
    width,
    height,
}) => {

    const [postCostAnalysis, setPostCostAnalysis] = useState({
        materialCostPerPart: 0,
        defectCostPerPart: 0,
        toolsCostPerPart: 0,
        coolantCostPerPart: 0,
        totalCostPerPart: 0,
    });

    const [comparedPostCostAnalysis, setComparedPostCostAnalysis] = useState({
        materialCostPerPart: 0,
        defectCostPerPart: 0,
        toolsCostPerPart: 0,
        coolantCostPerPart: 0,
        totalCostPerPart: 0,
    });
    
    // Cost analysis calculations
    useEffect(() => {
        if (post) {
            const {
                materialCostPerPart,
                defectCostPerPart,
                toolsCostPerPart,
                coolantCostPerPart,
                totalCostPerPart,
            } = costAnalysisCalculation(post);

            setPostCostAnalysis({
                defectCostPerPart: Number(defectCostPerPart).toFixed(2),
                toolsCostPerPart: Number(toolsCostPerPart).toFixed(2),
                coolantCostPerPart: Number(coolantCostPerPart).toFixed(2),
                totalCostPerPart: Number(totalCostPerPart).toFixed(2),

                defectCostPerPartContributingFactor: Number(defectCostPerPart / totalCostPerPart * 100).toFixed(2),
                toolsCostPerPartContributingFactor: Number(toolsCostPerPart / totalCostPerPart * 100).toFixed(2),
                coolantCostPerPartContributingFactor: Number(coolantCostPerPart / totalCostPerPart * 100).toFixed(2),
            });
        }

        if (comparedPost) {
            const {
                materialCostPerPart,
                defectCostPerPart,
                toolsCostPerPart,
                coolantCostPerPart,
                totalCostPerPart,
            } = costAnalysisCalculation(comparedPost);

            setComparedPostCostAnalysis({
                defectCostPerPart: Number(defectCostPerPart).toFixed(2),
                toolsCostPerPart: Number(toolsCostPerPart).toFixed(2),
                coolantCostPerPart: Number(coolantCostPerPart).toFixed(2),
                totalCostPerPart: Number(totalCostPerPart).toFixed(2),

                defectCostPerPartContributingFactor: Number(defectCostPerPart / totalCostPerPart * 100).toFixed(2),
                toolsCostPerPartContributingFactor: Number(toolsCostPerPart / totalCostPerPart * 100).toFixed(2),
                coolantCostPerPartContributingFactor: Number(coolantCostPerPart / totalCostPerPart * 100).toFixed(2),
            });
        } else {
            setComparedPostCostAnalysis(null)
        }
    }, [post, comparedPost])

    // Function for fetching files from storage
    const fetchFiles = async (partId) => {
        const fileTypes = ['images', 'models3D', 'pdfs'];
        const fetchedFiles = {};
  
        for (const fileType of fileTypes) {
          const folderRef = ref(storage, `parts/${partId}/${fileType}`);
          try {
            const filesList = await listAll(folderRef);
            const fileUrls = await Promise.all(
              filesList.items.map(file => getDownloadURL(file))
            );
            fetchedFiles[fileType] = fileUrls;
          } catch (error) {
            console.log(`Error fetching ${fileType}: `, error);
          }
        }
  
        return fetchedFiles;
    };

    // Fetch files from storage
    const [files, setFiles] = useState(null);
    useEffect(() => {
        if (!post?.setting?.part) return;
        fetchFiles(post.setting.partRef.id)
            .then((files) => {
                setFiles(files);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [post?.setting?.part])


    if (!post) return (
        <div 
            className={`flex overflow-y-scroll flex-col w-full border-l-2 border-black scrollbar-hide`}
        >
        </div>
    );
  return (
    <div 
        className={`flex overflow-y-scroll flex-col w-full border-l-2 border-black scrollbar-hide`}
    >
        <div className={`flex flex-col w-full px-5`}>
            <div className='flex items-center justify-between'>
                <div className={`flex justify-between flex-col w-full`}>
                    <div>
                        <h1 className='text-4xl font-bold'>{post.title}</h1>
                        <p>by {post.createdBy.email}</p>
                    </div>
                    <PostSettingDetailsList
                        post={post}
                        textSize='text-xl'
                    />
                    <p className='text-xl font-semibold my-5'>{post.body}</p>
                    <PostSettingTable
                        post={post}
                        postCostAnalysis={postCostAnalysis}
                        comparedPost={comparedPost}
                        comparedPostCostAnalysis={comparedPostCostAnalysis}
                    />
                </div>
                {post.setting?.part && files?.models3D?.length > 0 && (
                    <StlViewer
                        style={{
                            top: 0,
                            left: 0,
                            width: '400px',
                            height: '200px',
                        }}
                        className='bg-blue-500 rounded-xl shadow-lg'
                        orbitControls
                        shadows
                        url={files?.models3D[0]}
                    />
                )}
            </div>
            <SettingsList
                settings={post.setting?.settings}
                width={width}
                breakpoint={breakpoint}
            />
        </div>

        <CommentFeed
            post={post}
            user={user}
            breakpoint={breakpoint}
            width={width}
            height={height}
        />
    </div>
  )
}

export default FocusPost
