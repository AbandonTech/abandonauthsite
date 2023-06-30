import DeveloperApplication from "@/lib/types/developerApplication"
import useAuthFetch from "@/lib/hooks/useAuthFetch"
import CreateDeveloperApplication from "@/lib/types/createDeveloperApplication"
import createDeveloperApp from "@/lib/hooks/createDeveloperApp"

async function getUserApps(): Promise<DeveloperApplication[]> {
    let response = await useAuthFetch('/user/applications')
  
    if (!response.ok)
      throw new Error()
  
    return await response.json()
  }



export default async function DeveloperAppCard() {
    let userApplications = await getUserApps()

    async function createNewUserApp() {
        const respData: CreateDeveloperApplication = await createDeveloperApp()
        userApplications = await getUserApps()
    }
    
    console.log(userApplications)
    return <ul className='menu bg-base-200 w-11/12 rounded-box'>
        <li className='menu-title'>Developer Apps</li>
        { userApplications.length ? userApplications.map(application => 
            <li key={application.id}><span>{application.id}</span></li>
        
        ) : <li><span>You have no developer Apps</span></li>}
        <li><button className="btn btn-primary" onClick={async () => {await createNewUserApp();} } >Create</button></li>
    </ul>

}