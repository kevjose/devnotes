export async function getJobs() {
  const response = await fetch('https://cfc-bak.herokuapp.com/jobs', {
    method: 'GET',
  });
  let data;
  if (response.status === 200) {
    data = await response.json();
  } else {
    data = { error: await response.json() };
  }

  return data;
}
