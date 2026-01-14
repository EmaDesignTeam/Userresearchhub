import { createClient } from "npm:@supabase/supabase-js@2";

// This script seeds the database with sample research data
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

async function seedSampleData() {
  console.log('🌱 Seeding sample research data...\n');

  try {
    // Get reference data
    const { data: departments } = await supabase.from('departments').select('*');
    const { data: teams } = await supabase.from('teams').select('*');

    const engineering = departments?.find(d => d.name === 'Engineering');
    const product = departments?.find(d => d.name === 'Product');
    const design = departments?.find(d => d.name === 'Design');

    // Seed sample candidates
    console.log('Adding sample candidates...');
    const candidatesData = [
      {
        name: 'Hiten Vidhani',
        department_id: engineering?.id,
        title: 'Software Engineer',
        location: 'Mumbai',
        date_of_joining: '2023-01-15',
        research_status: 'Completed',
        features_tested: ['Voice AIE'],
        user_type: 'End User',
        notes: 'Very helpful feedback on Voice AIE usability'
      },
      {
        name: 'Priyanshu Kumar',
        department_id: product?.id,
        title: 'Product Manager',
        location: 'Bangalore',
        date_of_joining: '2022-11-20',
        research_status: 'Completed',
        features_tested: ['GWE', 'Auto builder'],
        user_type: 'Builder',
        notes: 'Great insights on workflow optimization'
      },
      {
        name: 'Parth Baghel',
        department_id: engineering?.id,
        title: 'Senior Engineer',
        location: 'Delhi',
        date_of_joining: '2023-03-10',
        research_status: 'Completed',
        features_tested: ['GWE', 'Auto builder'],
        user_type: 'Builder',
        notes: 'Detailed feedback on Auto builder features'
      },
      {
        name: 'Somesh Mishra',
        department_id: design?.id,
        title: 'UX Designer',
        location: 'Pune',
        date_of_joining: '2022-08-05',
        research_status: 'Completed',
        features_tested: ['Voice AIE'],
        user_type: 'Builder',
        notes: ''
      },
      {
        name: 'Ananya Sharma',
        department_id: product?.id,
        title: 'Associate PM',
        location: 'Mumbai',
        date_of_joining: '2023-09-01',
        research_status: 'Scheduled',
        features_tested: ['Doc writer'],
        user_type: 'End User',
        notes: ''
      },
      {
        name: 'Rahul Mehta',
        department_id: engineering?.id,
        title: 'Backend Engineer',
        location: 'Hyderabad',
        date_of_joining: '2023-07-20',
        research_status: 'To be scheduled',
        features_tested: [],
        user_type: 'Builder',
        notes: ''
      }
    ];

    const { data: insertedCandidates, error: candidatesError } = await supabase
      .from('candidates')
      .insert(candidatesData)
      .select();

    if (candidatesError) {
      console.error('Error inserting candidates:', candidatesError);
    } else {
      console.log(`  ✓ Added ${insertedCandidates?.length} candidates`);
    }

    // Seed sample sessions
    if (insertedCandidates && insertedCandidates.length > 0) {
      console.log('Adding sample sessions...');
      const sessionsData = [
        {
          candidate_id: insertedCandidates[0].id,
          product: 'Voice AIE',
          features_tested: ['Voice AIE'],
          moderator: 'Sarah Johnson',
          session_date: '2024-01-15',
          session_time: '14:00:00',
          duration: '45 mins',
          status: 'Completed',
          session_notes: 'User found the interface intuitive but suggested improvements to error handling.',
          objectives: 'Test Voice AIE usability',
          observations: 'User struggled with configuration setup initially',
          quotes: '"The voice recognition is impressive, but I wish error messages were clearer"'
        },
        {
          candidate_id: insertedCandidates[1].id,
          product: 'GWE',
          features_tested: ['GWE', 'Auto builder'],
          moderator: 'Mike Chen',
          session_date: '2024-01-18',
          session_time: '10:00:00',
          duration: '60 mins',
          status: 'Completed',
          session_notes: 'Excellent feedback on Auto builder workflow'
        },
        {
          candidate_id: insertedCandidates[2].id,
          product: 'Auto builder',
          features_tested: ['Auto builder'],
          moderator: 'Sarah Johnson',
          session_date: '2024-01-20',
          session_time: '15:30:00',
          duration: '50 mins',
          status: 'Completed',
          session_notes: 'Detailed technical insights'
        }
      ];

      const { data: insertedSessions, error: sessionsError } = await supabase
        .from('sessions')
        .insert(sessionsData)
        .select();

      if (sessionsError) {
        console.error('Error inserting sessions:', sessionsError);
      } else {
        console.log(`  ✓ Added ${insertedSessions?.length} sessions`);
      }
    }

    // Seed sample insights
    if (insertedCandidates && insertedCandidates.length > 0) {
      console.log('Adding sample insights...');
      
      const feTeam = teams?.find(t => t.name === 'FE');
      const pmTeam = teams?.find(t => t.name === 'PM');
      const uxTeam = teams?.find(t => t.name === 'UX');

      const insightsData = [
        {
          title: 'Shared configuration and Auto builder modal open together',
          description: 'When both the shared configuration panel and Auto builder modal are open simultaneously, users are confused about which interface to interact with.',
          user_interviewed: insertedCandidates[1].id,
          product: 'Auto builder',
          status: 'Under development',
          triage_status: 'In progress',
          priority: 'P0',
          category: 'Other',
          team_id: feTeam?.id,
          effort: 'xs',
          tags: ['UX', 'confusion'],
          assignee: 'Dev Team'
        },
        {
          title: 'Knowledge search number of chunks should not be negative',
          description: 'Currently the system allows users to set negative values for chunk selection which causes errors.',
          user_interviewed: insertedCandidates[0].id,
          product: 'Voice AIE',
          status: 'Picked up',
          triage_status: 'Todo',
          priority: 'P0',
          category: 'Bug',
          team_id: feTeam?.id,
          effort: 'xs',
          tags: ['validation', 'bug']
        },
        {
          title: 'Used templates to create AIE… why is AIE disabled?',
          description: 'Users are confused when they create an AIE using templates but then find it disabled with unclear error messaging.',
          user_interviewed: insertedCandidates[1].id,
          product: 'Voice AIE',
          status: 'Picked up',
          triage_status: 'Todo',
          priority: 'P0',
          category: 'Feature Enhancement',
          team_id: pmTeam?.id,
          effort: 'sm',
          tags: ['templates', 'error-messaging']
        },
        {
          title: 'Add examples to glossary',
          description: 'The glossary feature lacks examples, making it difficult for users to understand what kind of content they should add.',
          user_interviewed: insertedCandidates[1].id,
          product: 'GWE',
          status: 'Picked up',
          triage_status: 'Todo',
          priority: 'P1',
          category: 'Copy Change',
          team_id: uxTeam?.id,
          effort: 'xs',
          tags: ['documentation', 'help-text']
        },
        {
          title: 'Tag creation UI needs examples',
          description: 'Tag creation interface needs contextual examples like country/state to help users understand the taxonomy structure.',
          user_interviewed: insertedCandidates[2].id,
          product: 'GWE',
          status: 'Resolved',
          triage_status: 'Done',
          priority: 'P1',
          category: 'Copy Change',
          team_id: uxTeam?.id,
          effort: 'xs',
          tags: ['tags', 'examples']
        }
      ];

      const { data: insertedInsights, error: insightsError } = await supabase
        .from('insights')
        .insert(insightsData)
        .select();

      if (insightsError) {
        console.error('Error inserting insights:', insightsError);
      } else {
        console.log(`  ✓ Added ${insertedInsights?.length} insights`);
      }
    }

    console.log('\n✨ Sample data seeding complete!\n');
    console.log('You can now:');
    console.log('  - View candidates in the Candidates page');
    console.log('  - Check research sessions in the Sessions page');
    console.log('  - Review insights in the Analysis page');
    console.log('  - See activity logs in the Dashboard\n');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
}

// Run if this is the main module
if (import.meta.main) {
  await seedSampleData();
}
