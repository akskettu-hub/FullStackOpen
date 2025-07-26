# Exercise 1: CI for a Python project

## Setting Up CI
Common steps in setting up Continuous Integration for a project include _linting_, _testing_, and _building_. This section goes over what that entails in a Python project.

### Linting
Linters analyse code for potential errors and ensure that it conforms to code styling and formatting requirements. For Python popular linting tools include `flake8`, `pylint`, `ruff`, and `black`.

### Testing
Since CI involves contributors commiting changes multiple times a day, testing is an important step in ensuring that the code remains in a working state. The Python standard library includes unit testing, but other popular libraries include `pytest`, `Behave`, and `Testify`.

### Building
As Python is an interpreted language, a "build" step is rather minimal, as compilation is not applicable. However, if the code includes libraries, packages, or frameworks that are not included in the Python standard library, these dependecies need to be listed, typically in a text file or Pipfile, so that including dependencies can be automated.

## Alternatives for Jenkins and GitHub Actions
Alternatives for self-hosting CI tools include GitLab (paid service, offers free trial), BuildBot, and Concourse. For Cloud-based services, alternatives include Azure Pipelines (paid service, free trials) and GitLab, both of which offer self-hosted alternatives as well.

## Self-Hosted or Cloud-bases
There are several factors that should: be considered when choosing between an self-hosted and a cloud-based CI setup. These depend on the requirements of the project and tend to entail a set of trade-offs. For example, a cloud based solution might be more cost effective if equipment maintainece and procurement costs of self-hosting eclipse cloud-based solutions. On the other hand, if the project requires custom hardware, or something else out of the ordinary, cloud-based solutions might not be a workable solution in the first place.
